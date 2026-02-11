import { useSuspenseQuery } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const useVideoById = (videoId: string) => {
	const trpc = useTRPC();
	return useSuspenseQuery(trpc.videos.getOne.queryOptions({ id: videoId }));
};
