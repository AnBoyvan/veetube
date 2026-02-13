import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DEFAULT_COMMENTS_LIMIT, DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseLikeCommentProps {
	videoId: string;
	parentId?: string | null;
}

export const useDislikeComment = ({
	videoId,
	parentId,
}: UseLikeCommentProps) => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const clerk = useClerk();

	return useMutation(
		trpc.commentReactions.dislike.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: trpc.comments.getMany.infiniteQueryKey({
						videoId,
						limit: DEFAULT_COMMENTS_LIMIT,
					}),
				});

				if (parentId) {
					await queryClient.invalidateQueries({
						queryKey: trpc.comments.getMany.infiniteQueryKey({
							videoId,
							parentId,
							limit: DEFAULT_COMMENTS_LIMIT,
						}),
					});
				}

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getLiked.infiniteQueryKey({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});
			},
			onError: error => {
				if (error.data?.code === 'UNAUTHORIZED') {
					clerk.openSignIn();
				}
			},
		}),
	);
};
