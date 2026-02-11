import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_SUBSCRIPTIONS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useSuspenseSubscriptions = () => {
	const trpc = useTRPC();
	return useSuspenseInfiniteQuery(
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
