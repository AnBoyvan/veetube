import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useVideos = (categoryId?: string) => {
	const trpc = useTRPC();
	return useSuspenseInfiniteQuery(
		trpc.videos.getMany.infiniteQueryOptions(
			{
				categoryId,
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
