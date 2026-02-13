import { PlaylistsView } from '@/features/playlists/ui/views/playlists-view';
import { DEFAULT_PLAYLISTS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const PlaylistsPage = async () => {
	prefetch(
		trpc.playlists.getMany.infiniteQueryOptions({
			limit: DEFAULT_PLAYLISTS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<PlaylistsView />
		</HydrateClient>
	);
};

export default PlaylistsPage;
