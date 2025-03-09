'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { trpc } from '@/trpc/client';

interface VideosSectionSuspenseProps {
	userId: string;
}

export const VideosSectionSuspense = ({
	userId,
}: VideosSectionSuspenseProps) => {
	const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
		{
			userId,
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-10">
				{videos.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
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
