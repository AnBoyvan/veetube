import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_SUBSCRIPTIONS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useSubscriptions = () => {
	const trpc = useTRPC();
	return useInfiniteQuery(
		trpc.subscriptions.getMany.infiniteQueryOptions(
			{
				limit: DEFAULT_SUBSCRIPTIONS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
