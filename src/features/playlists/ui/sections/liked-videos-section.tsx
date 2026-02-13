'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';
import {
	VideoRowCard,
	VideoRowCardSkeleton,
} from '@/features/videos/ui/components/video-row-card';

import { useLiked } from '../../hooks/use-liked';

export const LikedVideosSection = () => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useLiked();

	return (
		<div>
			<div className="flex flex-col gap-4 gap-y-10 md:hidden">
				{data.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
					))}
			</div>
			<div className="hidden flex-col gap-4 md:flex">
				{data.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoRowCard key={video.id} data={video} size="compact" />
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

export const LikedVideosSectionSkeleton = () => {
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
