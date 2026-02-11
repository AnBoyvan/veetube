import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_SUGGESTIONS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useSuggestions = (videoId: string) => {
	const trpc = useTRPC();

	return useSuspenseInfiniteQuery(
		trpc.suggestions.getMany.infiniteQueryOptions(
			{
				videoId,
				limit: DEFAULT_SUGGESTIONS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
