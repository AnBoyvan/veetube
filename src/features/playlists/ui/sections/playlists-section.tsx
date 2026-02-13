import { InfiniteScroll } from '@/components/common/infinite-scroll';

import { usePlaylists } from '../../hooks/use-playlists';
import {
	PlaylistGridCard,
	PlaylistGridCardSkeleton,
} from '../components/playlist-grid-card';

export const PlaylistsSection = () => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		usePlaylists();

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
				{data.pages
					.flatMap(page => page.items)
					.map(playlist => (
						<PlaylistGridCard key={playlist.id} data={playlist} />
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

export const PlaylistsSectionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
			{Array.from({ length: 18 }).map((_, idx) => (
				<PlaylistGridCardSkeleton key={idx} />
			))}
		</div>
	);
};
