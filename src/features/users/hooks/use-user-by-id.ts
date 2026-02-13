import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const useUserById = (userId: string) => {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.users.getOne.queryOptions({
			id: userId,
		}),
	);
};
