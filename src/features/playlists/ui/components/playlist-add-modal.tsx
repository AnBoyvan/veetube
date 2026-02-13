import { Loader2Icon, SquareCheckIcon, SquareIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { ResponsiveModal } from '@/components/common/responsive-modal';
import { Button } from '@/components/ui/button';

import { useAddToPlaylist } from '../../hooks/use-add-to-playlist';
import { usePlaylistsForVideo } from '../../hooks/use-playlists-for-video';
import { useRemoveFromPlaylist } from '../../hooks/use-remove-from-playlist';

interface PlaylistAddModal {
	videoId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const PlaylistAddModal = ({
	videoId,
	open,
	onOpenChange,
}: PlaylistAddModal) => {
	const t = useTranslations();

	const {
		data: playlists,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = usePlaylistsForVideo({ videoId, enabled: !!videoId && open });

	const addVideo = useAddToPlaylist();

	const removeVideo = useRemoveFromPlaylist();

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('video.add_to_playlist')}
		>
			<div className="flex flex-col gap-2">
				{isLoading && (
					<div className="flex justify-center p-4">
						<Loader2Icon className="size-5 animate-spin text-muted-foreground" />
					</div>
				)}
				{!isLoading &&
					playlists?.pages
						.flatMap(page => page.items)
						.map(playlist => (
							<Button
								key={playlist.id}
								size="lg"
								variant="ghost"
								disabled={addVideo.isPending || removeVideo.isPending}
								onClick={() => {
									if (playlist.containsVideo) {
										removeVideo.mutate({ playlistId: playlist.id, videoId });
									} else {
										addVideo.mutate({ playlistId: playlist.id, videoId });
									}
								}}
								className="w-full justify-start px-2 [&_svg]:size-5"
							>
								{playlist.containsVideo ? (
									<SquareCheckIcon className="mr-2" />
								) : (
									<SquareIcon className="mr-2" />
								)}
								{playlist.name}
							</Button>
						))}
				{isLoading && (
					<InfiniteScroll
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
						isManual
					/>
				)}
			</div>
		</ResponsiveModal>
	);
};
