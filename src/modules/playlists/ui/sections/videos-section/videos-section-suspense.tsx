'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { trpc } from '@/trpc/client';

interface VideosSectionSuspenseProps {
	playlistId: string;
}

export const VideosSectionSuspense = ({
	playlistId,
}: VideosSectionSuspenseProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const [videos, query] = trpc.playlists.getVideos.useSuspenseInfiniteQuery(
		{
			playlistId,
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	const removeVideo = trpc.playlists.removeVideo.useMutation({
		onSuccess: data => {
			toast.success(t('video.video_removed'));
			utils.playlists.getOne.invalidate({ id: data.playlistId });
			utils.playlists.getVideos.invalidate({ playlistId: data.playlistId });
			utils.playlists.getMany.invalidate();
			utils.playlists.getManyForVideo.invalidate({ videoId: data.videoId });
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	return (
		<div>
			<div className="flex md:hidden flex-col gap-4 gap-y-10">
				{videos.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard
							key={video.id}
							data={video}
							onRemove={() =>
								removeVideo.mutate({ playlistId, videoId: video.id })
							}
						/>
					))}
			</div>
			<div className="hidden md:flex flex-col gap-4">
				{videos.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoRowCard
							key={video.id}
							data={video}
							size="compact"
							onRemove={() =>
								removeVideo.mutate({ playlistId, videoId: video.id })
							}
						/>
					))}
			</div>
			<InfiniteScroll
				hasNextPage={query.hasNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
				fetchNextPage={query.fetchNextPage}
			/>
		</div>
	);
};
