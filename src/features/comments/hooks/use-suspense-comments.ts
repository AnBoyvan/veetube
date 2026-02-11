import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_COMMENTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseCommentsProps {
	videoId: string;
	parentId?: string;
}

export const useSuspenseComments = ({
	videoId,
	parentId,
}: UseCommentsProps) => {
	const trpc = useTRPC();

	return useSuspenseInfiniteQuery(
		trpc.comments.getMany.infiniteQueryOptions(
			{
				limit: DEFAULT_COMMENTS_LIMIT,
				videoId,
				parentId,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);
};
