import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { UploadDropzone } from '@/lib/uploadthing';
import { useTRPC } from '@/trpc/client';

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
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const onUploadComplete = async () => {
		onOpenChange(false);

		await queryClient.invalidateQueries({
			queryKey: trpc.users.getOne.queryKey({
				id: userId,
			}),
		});
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
