'use client';

import { useRouter } from 'next/navigation';

import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';

interface PlaylistHeaderSectionSuspenseProps {
	playlistId: string;
}

export const PlaylistHeaderSectionSuspense = ({
	playlistId,
}: PlaylistHeaderSectionSuspenseProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();
	const router = useRouter();

	const [playlist] = trpc.playlists.getOne.useSuspenseQuery({
		id: playlistId,
	});

	const remove = trpc.playlists.remove.useMutation({
		onSuccess: () => {
			toast.success(t('video.playlist_remove_success'));
			utils.playlists.getMany.invalidate();
			router.push('/playlists');
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	return (
		<div className="flex justify-between items-center">
			<div>
				<h1 className="text-2xl font-bold">{playlist.name}</h1>
				<p className="text-xs text-muted-foreground">
					{!!playlist.description
						? playlist.description
						: t('video.playlist_description')}
				</p>
			</div>
			<Button
				size="icon"
				variant="outline"
				disabled={remove.isPending}
				onClick={() => remove.mutate({ id: playlistId })}
				className="rounded-full"
			>
				<Trash2Icon />
			</Button>
		</div>
	);
};
