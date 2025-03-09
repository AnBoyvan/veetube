'use client';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_PLAYLISTS_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';

import { PlaylistGridCard } from '../../components/playlist-grid-card';

export const PlaylistsSectionSuspense = () => {
	const [playlists, query] = trpc.playlists.getMany.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_PLAYLISTS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6 gap-4 gap-y-10">
				{playlists.pages
					.flatMap(page => page.items)
					.map(playlist => (
						<PlaylistGridCard key={playlist.id} data={playlist} />
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
