import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_PLAYLISTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const usePlaylistsForVideo = (videoId: string) => {
	const trpc = useTRPC();

	return useInfiniteQuery(
		trpc.playlists.getManyForVideo.infiniteQueryOptions(
			{
				videoId,
				limit: DEFAULT_PLAYLISTS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
