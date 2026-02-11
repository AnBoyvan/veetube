import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useHistory = () => {
	const trpc = useTRPC();

	return useSuspenseInfiniteQuery(
		trpc.playlists.getLiked.infiniteQueryOptions(
			{
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
