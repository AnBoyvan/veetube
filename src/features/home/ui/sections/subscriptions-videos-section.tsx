import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { useVideosBySubscriptions } from '@/features/videos/hooks/use-videos-by-subscriptions';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';

export const SubscriptionsVideosSection = () => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useVideosBySubscriptions();

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

export const SubscriptionsVideosSectionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
			{Array.from({ length: 18 }).map((_, idx) => (
				<VideoGridCardSkeleton key={idx} />
			))}
		</div>
	);
};
