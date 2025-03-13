'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Globe2Icon, LockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { InputField } from '@/components/form/input-field';
import { SelectField } from '@/components/form/select-field';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { videoUpdateSchema } from '@/db/schema';
import { getTranslated } from '@/i18n/get-translated';
import { trpc } from '@/trpc/client';

import { AiGenerateButton } from '../../components/ai-generate-button';
import { VideoFormInfo } from '../../components/video-form-info';
import { VideoFormMenu } from '../../components/video-form-menu';
import { VideoFormThumbnail } from '../../components/video-form-thumbnail';

interface FormSectionSuspenseProps {
	videoId: string;
}

export const FormSectionSuspense = ({ videoId }: FormSectionSuspenseProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const update = trpc.videos.update.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: video.id });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});

	const generateTitle = trpc.videos.generateTitle.useMutation({
		onSuccess: () => {
			toast.success(t('common.bg_job_started'), {
				description: t('common.take_time'),
			});
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const generateDescription = trpc.videos.generateDescription.useMutation({
		onSuccess: () => {
			toast.success(t('common.bg_job_started'), {
				description: t('common.take_time'),
			});
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const form = useForm<z.infer<typeof videoUpdateSchema>>({
		defaultValues: video,
		resolver: zodResolver(videoUpdateSchema),
	});

	const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
		update.mutate(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mb-10">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-2xl font-bold">{t('video.details')}</h1>
						<p className="text-xs text-muted-foreground">
							{t('video.details_manage')}
						</p>
					</div>
					<div className="flex items-center gap-x-2">
						<Button
							type="submit"
							disabled={update.isPending || !form.formState.isDirty}
						>
							{t('actions.save')}
						</Button>
						<VideoFormMenu videoId={video.id} />
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
					<div className="space-y-8 lg:col-span-3">
						<InputField
							control={form.control}
							name="title"
							label={t('common.title')}
							placeholder={t('video.title_placeholder')}
							generateAction={
								<AiGenerateButton
									disabled={!video.muxTrackId}
									isPending={generateTitle.isPending}
									onClick={() => generateTitle.mutate({ id: video.id })}
								/>
							}
						/>
						<TextareaField
							control={form.control}
							name="description"
							label={t('common.description')}
							rows={10}
							placeholder={t('video.description_placeholder')}
							className="resize-none pr-10"
							generateAction={
								<AiGenerateButton
									disabled={!video.muxTrackId}
									isPending={generateDescription.isPending}
									onClick={() => generateDescription.mutate({ id: video.id })}
								/>
							}
						/>
						<VideoFormThumbnail
							control={form.control}
							name="thumbnailUrl"
							videoId={video.id}
							thumbnailUrl={video.thumbnailUrl}
						/>
						<SelectField
							control={form.control}
							name="categoryId"
							label={t('common.category')}
							placeholder={t('video.category_placeholder')}
						>
							{categories.map(category => (
								<SelectItem key={category.id} value={category.id}>
									{getTranslated(t, category.name)}
								</SelectItem>
							))}
						</SelectField>
					</div>
					<div className="flex flex-col gap-y-8 lg:col-span-2">
						<VideoFormInfo
							videoId={video.id}
							muxPlaybackId={video.muxPlaybackId}
							thumbnailUrl={video.thumbnailUrl}
							muxStatus={video.muxStatus}
							muxTrackStatus={video.muxTrackStatus}
						/>
						<SelectField
							control={form.control}
							name="visibility"
							label={t('common.visibility')}
							placeholder={t('video.visibility_placeholder')}
						>
							<>
								<SelectItem value="public">
									<div className="flex items-center">
										<Globe2Icon className="size-4 mr-2" />
										{t('video.visibility.public')}
									</div>
								</SelectItem>
								<SelectItem value="private">
									<div className="flex items-center">
										<LockIcon className="size-4 mr-2" />
										{t('video.visibility.private')}
									</div>
								</SelectItem>
							</>
						</SelectField>
					</div>
				</div>
			</form>
		</Form>
	);
};
