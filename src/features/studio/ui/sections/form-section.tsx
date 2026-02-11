import { zodResolver } from '@hookform/resolvers/zod';
import { Globe2Icon, LockIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type z from 'zod';

import { InputField } from '@/components/form/input-field';
import { SelectField } from '@/components/form/select-field';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { videoUpdateSchema } from '@/db/schema';
import { useCategories } from '@/features/categories/hooks/use-categories';
import { useGenerateVideoDescription } from '@/features/videos/hooks/use-generate-video-description';
import { useGenerateVideoTitle } from '@/features/videos/hooks/use-generate-video-title';
import { useUpdateVideo } from '@/features/videos/hooks/use-update-video';
import { getTranslated } from '@/i18n/get-translated';

import { useStudioVideo } from '../../hooks/use-studio-video';
import { AiGenerateButton } from '../components/ai-generate-button';
import {
	VideoFormInfo,
	VideoFormInfoSkeleton,
} from '../components/video-form-info';
import { VideoFormMenu } from '../components/video-form-menu';
import {
	VideoFormThumbnail,
	VideoFormThumbnailSkeleton,
} from '../components/video-form-thumbnail';

interface FormSectionProps {
	videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
	const t = useTranslations();

	const { data: video } = useStudioVideo(videoId);
	const { data: categories } = useCategories();

	const update = useUpdateVideo();
	const generateTitle = useGenerateVideoTitle();
	const generateDescription = useGenerateVideoDescription();

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
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl">{t('video.details')}</h1>
						<p className="text-muted-foreground text-xs">
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
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
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
							placeholder={t('video.description_placeholder')}
							rows={10}
							className="h-[220px] resize-none pr-10"
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
							<SelectItem value="public">
								<div className="flex items-center">
									<Globe2Icon className="mr-2 size-4" />
									{t('video.visibility.public')}
								</div>
							</SelectItem>
							<SelectItem value="private">
								<div className="flex items-center">
									<LockIcon className="mr-2 size-4" />
									{t('video.visibility.private')}
								</div>
							</SelectItem>
						</SelectField>
					</div>
				</div>
			</form>
		</Form>
	);
};

export const FormSectionSkeleton = () => {
	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-40" />
				</div>
				<Skeleton className="h-9 w-24" />
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
				<div className="space-y-8 lg:col-span-3">
					<div className="space-y-3.5 pt-1">
						<Skeleton className="h-3.5 w-16" />
						<Skeleton className="h-9 w-full" />
					</div>
					<div className="space-y-3.5 pt-1">
						<Skeleton className="h-3.5 w-24" />
						<Skeleton className="h-[220px] w-full" />
					</div>
					<VideoFormThumbnailSkeleton />
					<div className="space-y-2">
						<Skeleton className="h-3.5 w-20" />
						<Skeleton className="h-9 w-44" />
					</div>
				</div>
				<div className="flex flex-col gap-y-8 lg:col-span-2">
					<VideoFormInfoSkeleton />
					<div className="space-y-2">
						<Skeleton className="h-3.5 w-20" />
						<Skeleton className="h-9 w-40" />
					</div>
				</div>
			</div>
		</div>
	);
};
