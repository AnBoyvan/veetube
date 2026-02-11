import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DEFAULT_COMMENTS_LIMIT, DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseLikeCommentProps {
	videoId: string;
	parentId?: string | null;
}

export const useLikeComment = ({ videoId, parentId }: UseLikeCommentProps) => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const clerk = useClerk();

	return useMutation(
		trpc.commentReactions.like.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					trpc.comments.getMany.queryOptions({
						videoId,
						limit: DEFAULT_COMMENTS_LIMIT,
					}),
				);
				if (parentId) {
					trpc.comments.getMany.queryOptions({
						videoId,
						parentId: parentId,
						limit: DEFAULT_COMMENTS_LIMIT,
					});
				}

				await queryClient.invalidateQueries(
					trpc.playlists.getLiked.queryOptions({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				);
			},
			onError: error => {
				if (error.data?.code === 'UNAUTHORIZED') {
					clerk.openSignIn();
				}
			},
		}),
	);
};
