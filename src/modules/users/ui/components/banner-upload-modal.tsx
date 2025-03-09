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
			/>
		</ResponsiveModal>
	);
};
