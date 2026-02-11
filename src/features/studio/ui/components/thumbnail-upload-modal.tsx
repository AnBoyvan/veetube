import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { UploadDropzone } from '@/lib/uploadthing';
import { useTRPC } from '@/trpc/client';

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
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const onUploadComplete = async () => {
		onOpenChange(false);
		await queryClient.invalidateQueries(
			trpc.studio.getMany.queryOptions({ limit: DEFAULT_VIDEOS_LIMIT }),
		);
		await queryClient.invalidateQueries(
			trpc.studio.getOne.queryOptions({ id: videoId }),
		);
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
