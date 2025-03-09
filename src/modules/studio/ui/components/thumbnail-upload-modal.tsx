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
			title={t('video.upload_thumbnail')}
		>
			<UploadDropzone
				endpoint="thumbnailUploader"
				input={{ videoId }}
				onClientUploadComplete={() => onUploadComplete()}
			/>
		</ResponsiveModal>
	);
};
