import { LikedView } from '@/features/playlists/ui/views/liked-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const LikedPage = async () => {
	prefetch(
		trpc.playlists.getLiked.infiniteQueryOptions({
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<LikedView />
		</HydrateClient>
	);
};

export default LikedPage;
