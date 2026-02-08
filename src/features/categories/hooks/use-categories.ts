import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const useCategories = () => {
	const trpc = useTRPC();
	return useSuspenseQuery(trpc.categories.getMany.queryOptions());
};
