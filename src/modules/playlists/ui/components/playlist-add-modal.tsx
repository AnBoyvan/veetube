import { Loader2Icon, SquareCheckIcon, SquareIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { ResponsiveModal } from '@/components/common/responsive-modal';
import { Button } from '@/components/ui/button';
import { DEFAULT_PLAYLISTS_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';

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
	const utils = trpc.useUtils();

	const {
		data: playlists,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = trpc.playlists.getManyForVideo.useInfiniteQuery(
		{
			videoId,
			limit: DEFAULT_PLAYLISTS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
			enabled: !!videoId && open,
		},
	);

	const addVideo = trpc.playlists.addVideo.useMutation({
		onSuccess: data => {
			toast.success(t('video.video_added'));
			utils.playlists.getOne.invalidate({ id: data.playlistId });
			utils.playlists.getVideos.invalidate({ playlistId: data.playlistId });
			utils.playlists.getMany.invalidate();
			utils.playlists.getManyForVideo.invalidate({ videoId });
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const removeVideo = trpc.playlists.removeVideo.useMutation({
		onSuccess: data => {
			toast.success(t('video.video_removed'));
			utils.playlists.getOne.invalidate({ id: data.playlistId });
			utils.playlists.getVideos.invalidate({ playlistId: data.playlistId });
			utils.playlists.getMany.invalidate();
			utils.playlists.getManyForVideo.invalidate({ videoId });
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('video.add_to_playlist')}
		>
			<div className="flex flex-col gap-2">
				{isLoading && (
					<div className="flex justify-center p-4">
						<Loader2Icon className="size-5 text-muted-foreground animate-spin" />
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
