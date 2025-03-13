import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { trpc } from '@/trpc/client';

interface ThumbnailGenerateModal {
	videoId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
	prompt: z.string().min(10),
});

export const ThumbnailGenerateModal = ({
	videoId,
	open,
	onOpenChange,
}: ThumbnailGenerateModal) => {
	const t = useTranslations();

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			prompt: '',
		},
		resolver: zodResolver(formSchema),
	});

	const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
		onSuccess: () => {
			toast.success(t('common.bg_job_started'), {
				description: t('common.take_time'),
			});
			form.reset();
			onOpenChange(false);
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		generateThumbnail.mutate({
			id: videoId,
			prompt: data.prompt,
		});
	};

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('video.thumbnail_upload')}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<TextareaField
						control={form.control}
						name="prompt"
						label={t('common.prompt')}
						rows={5}
						cols={30}
						placeholder={t('video.prompt_placeholder')}
						className="resize-none"
					/>

					<div className="flex justify-end">
						<Button type="submit" disabled={generateThumbnail.isPending}>
							{t('actions.generate')}
						</Button>
					</div>
				</form>
			</Form>
		</ResponsiveModal>
	);
};
