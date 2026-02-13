import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useDislikeVideo = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const clerk = useClerk();

	return useMutation(
		trpc.videoReactions.dislike.mutationOptions({
			onSuccess: async data => {
				await queryClient.invalidateQueries({
					queryKey: trpc.videos.getOne.queryKey({ id: data.videoId }),
				});

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
