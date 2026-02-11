import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useGenerateVideoThumbnail } from '@/features/videos/hooks/use-generate-video-thumbnail';

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

	const generateThumbnail = useGenerateVideoThumbnail();

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
