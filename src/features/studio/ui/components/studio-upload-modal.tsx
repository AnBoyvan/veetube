'use client';

import { useRouter } from 'next/navigation';

import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { Button } from '@/components/ui/button';
import { useCreateVideo } from '@/features/videos/hooks/use-create-video';

import { StudioUploader } from './studio-uploader';

export const StudioUploadModal = () => {
	const t = useTranslations();
	const router = useRouter();

	const create = useCreateVideo();

	const onSuccess = () => {
		if (!create.data?.video.id) return;

		create.reset();
		router.push(`/studio/videos/${create.data.video.id}`);
	};

	return (
		<>
			<ResponsiveModal
				title={t('video.upload')}
				open={!!create.data?.url}
				onOpenChange={() => create.reset()}
			>
				{create.data?.url ? (
					<StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
				) : (
					<Loader2Icon className="animate-spin" />
				)}
			</ResponsiveModal>
			<Button
				variant="secondary"
				disabled={create.isPending}
				onClick={() => create.mutate()}
			>
				{create.isPending ? (
					<Loader2Icon className="animate-spin" />
				) : (
					<PlusIcon />
				)}
				{t('actions.create')}
			</Button>
		</>
	);
};
