import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { useVideosByTrending } from '@/features/videos/hooks/use-videos-by-trending';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';

export const TrendingVideosSection = () => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useVideosByTrending();

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
				{data.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
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

export const TrendingVideosSectionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
			{Array.from({ length: 18 }).map((_, idx) => (
				<VideoGridCardSkeleton key={idx} />
			))}
		</div>
	);
};
