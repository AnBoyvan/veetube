import { InfiniteScroll } from '@/components/common/infinite-scroll';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';
import {
	VideoRowCard,
	VideoRowCardSkeleton,
} from '@/features/videos/ui/components/video-row-card';

import { usePlaylistVideos } from '../../hooks/use-playlist-videos';
import { useRemoveFromPlaylist } from '../../hooks/use-remove-from-playlist';

interface VideosSectionProps {
	playlistId: string;
}

export const VideosSection = ({ playlistId }: VideosSectionProps) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		usePlaylistVideos(playlistId);

	const removeVideo = useRemoveFromPlaylist();

	return (
		<div>
			<div className="flex flex-col gap-4 gap-y-10 md:hidden">
				{data.pages
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
			<div className="hidden flex-col gap-4 md:flex">
				{data.pages
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
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</div>
	);
};

export const VideosSectionSkeleton = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 gap-y-10 md:hidden">
				{Array.from({ length: 18 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
			<div className="hidden flex-col gap-4 md:flex">
				{Array.from({ length: 18 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} size="compact" />
				))}
			</div>
		</div>
	);
};
