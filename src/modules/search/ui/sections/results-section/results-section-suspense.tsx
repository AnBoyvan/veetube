'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { trpc } from '@/trpc/client';

interface ResultsSectionSuspenseProps {
	query?: string;
	categoryId?: string;
}

export const ResultsSectionSuspense = ({
	query,
	categoryId,
}: ResultsSectionSuspenseProps) => {
	const [results, resultsQuery] = trpc.search.getMany.useSuspenseInfiniteQuery(
		{
			query,
			categoryId,
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<>
			<div className="flex md:hidden flex-col gap-4 gap-y-10">
				{results.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
					))}
			</div>
			<div className="hidden md:flex flex-col gap-4">
				{results.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoRowCard key={video.id} data={video} />
					))}
			</div>
			<InfiniteScroll
				hasNextPage={resultsQuery.hasNextPage}
				isFetchingNextPage={resultsQuery.isFetchingNextPage}
				fetchNextPage={resultsQuery.fetchNextPage}
			/>
		</>
	);
};
