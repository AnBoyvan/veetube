import { PlaylistVideosView } from '@/features/playlists/ui/views/playlist-videos-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface PlaylistIdPageProps {
	params: Promise<{ playlistId: string }>;
}

const PlaylistIdPage = async ({ params }: PlaylistIdPageProps) => {
	const { playlistId } = await params;

	prefetch(trpc.playlists.getOne.queryOptions({ id: playlistId }));
	prefetch(
		trpc.playlists.getVideos.infiniteQueryOptions({
			playlistId,
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<PlaylistVideosView playlistId={playlistId} />
		</HydrateClient>
	);
};

export default PlaylistIdPage;
