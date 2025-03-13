import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { UploadDropzone } from '@/lib/uploadthing';
import { trpc } from '@/trpc/client';

interface ThumbnailUploadModal {
	videoId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({
	videoId,
	open,
	onOpenChange,
}: ThumbnailUploadModal) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const onUploadComplete = () => {
		onOpenChange(false);
		utils.studio.getMany.invalidate();
		utils.studio.getOne.invalidate({ id: videoId });
	};

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('video.thumbnail_upload')}
		>
			<UploadDropzone
				endpoint="thumbnailUploader"
				input={{ videoId }}
				onClientUploadComplete={() => onUploadComplete()}
				content={{
					label: t('actions.upload_choose'),
					button({ ready, files, isUploading }) {
						if (isUploading) return t('common.uploading');
						if (ready && files.length > 0) {
							return `${t('actions.upload')}(${files.length})`;
						}
						if (ready) return t('actions.upload');
						return t('common.getting_ready');
					},
					allowedContent() {
						return t('video.thumbnail_size');
					},
				}}
			/>
		</ResponsiveModal>
	);
};
