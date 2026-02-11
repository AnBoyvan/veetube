import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const useStudioVideo = (videoId: string) => {
	const trpc = useTRPC();
	return useSuspenseQuery(
		trpc.studio.getOne.queryOptions({
			id: videoId,
		}),
	);
};
