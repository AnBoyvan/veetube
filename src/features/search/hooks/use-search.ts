import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseSearchProps {
	query?: string;
	categoryId?: string;
}

export const useSearch = ({ query, categoryId }: UseSearchProps) => {
	const trpc = useTRPC();

	return useSuspenseInfiniteQuery(
		trpc.search.getMany.infiniteQueryOptions(
			{
				query,
				categoryId,
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
