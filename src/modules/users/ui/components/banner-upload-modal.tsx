import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { UploadDropzone } from '@/lib/uploadthing';
import { trpc } from '@/trpc/client';

interface BannerUploadModal {
	userId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const BannerUploadModal = ({
	userId,
	open,
	onOpenChange,
}: BannerUploadModal) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const onUploadComplete = () => {
		onOpenChange(false);
		utils.users.getOne.invalidate({ id: userId });
	};

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('user.upload_banner')}
		>
			<UploadDropzone
				endpoint="bannerUploader"
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
						return t('user.banner_size');
					},
				}}
			/>
		</ResponsiveModal>
	);
};
