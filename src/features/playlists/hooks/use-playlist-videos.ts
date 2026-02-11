import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const usePlaylistVideos = (playlistId: string) => {
	const trpc = useTRPC();

	return useSuspenseInfiniteQuery(
		trpc.playlists.getVideos.infiniteQueryOptions(
			{
				playlistId,
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
