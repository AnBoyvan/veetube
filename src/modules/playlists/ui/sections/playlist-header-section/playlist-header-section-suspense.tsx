'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/hooks/use-confirm';
import { trpc } from '@/trpc/client';

import { PlaylistMenu } from '../../components/playlist-menu';

interface PlaylistHeaderSectionSuspenseProps {
	playlistId: string;
}

export const PlaylistHeaderSectionSuspense = ({
	playlistId,
}: PlaylistHeaderSectionSuspenseProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();
	const router = useRouter();
	const [ConfirmDialog, confirmRemove] = useConfirm(
		t('playlist.remove_confirm'),
	);

	const [playlist] = trpc.playlists.getOne.useSuspenseQuery({
		id: playlistId,
	});

	const remove = trpc.playlists.remove.useMutation({
		onSuccess: () => {
			toast.success(t('playlist.remove_success'));
			utils.playlists.getMany.invalidate();
			router.push('/playlists');
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const handleRemove = async () => {
		const ok = await confirmRemove();
		if (!ok) return;

		remove.mutate({ id: playlistId });
	};

	return (
		<>
			<ConfirmDialog />
			<div className="flex justify-between items-center gap-x-4">
				<div>
					<h1 className="text-2xl font-bold">{playlist.name}</h1>
					<p className="text-xs text-muted-foreground">
						{!!playlist.description
							? playlist.description
							: t('playlist.description_default')}
					</p>
				</div>
				<PlaylistMenu playlist={playlist} />
			</div>
		</>
	);
};
