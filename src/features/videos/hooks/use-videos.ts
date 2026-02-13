import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseVideosProps {
	categoryId?: string;
	userId?: string;
}

export const useVideos = ({ categoryId, userId }: UseVideosProps) => {
	const trpc = useTRPC();
	return useSuspenseInfiniteQuery(
		trpc.videos.getMany.infiniteQueryOptions(
			{
				categoryId,
				userId,
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
