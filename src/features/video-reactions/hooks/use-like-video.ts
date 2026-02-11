import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useLikeVideo = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const clerk = useClerk();

	return useMutation(
		trpc.videoReactions.like.mutationOptions({
			onSuccess: async data => {
				await queryClient.invalidateQueries(
					trpc.videos.getOne.queryOptions({ id: data.videoId }),
				);
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
