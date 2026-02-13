'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { useVideos } from '@/features/videos/hooks/use-videos';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';

interface VideosSectionProps {
	userId: string;
}

export const VideosSection = ({ userId }: VideosSectionProps) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useVideos({
		userId,
	});

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
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

export const VideosSectionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
			{Array.from({ length: 18 }).map((_, idx) => (
				<VideoGridCardSkeleton key={idx} />
			))}
		</div>
	);
};
