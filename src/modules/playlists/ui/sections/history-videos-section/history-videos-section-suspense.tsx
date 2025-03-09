'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { trpc } from '@/trpc/client';

export const HistoryVideosSectionSuspense = () => {
	const [videos, query] = trpc.playlists.getHistory.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div>
			<div className="flex md:hidden flex-col gap-4 gap-y-10">
				{videos.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
					))}
			</div>
			<div className="hidden md:flex flex-col gap-4">
				{videos.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoRowCard key={video.id} data={video} size="compact" />
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
