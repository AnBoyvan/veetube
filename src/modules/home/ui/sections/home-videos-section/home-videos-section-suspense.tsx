'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { trpc } from '@/trpc/client';

interface HomeVideosSectionSuspenseProps {
	categoryId?: string;
}

export const HomeVideosSectionSuspense = ({
	categoryId,
}: HomeVideosSectionSuspenseProps) => {
	const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
		{
			categoryId,
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6 gap-4 gap-y-10">
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
