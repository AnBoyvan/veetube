import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTRPC } from '@/trpc/client';

export const useSetVideoView = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.videoViews.createOrUpdate.mutationOptions({
			onSuccess: async data => {
				await queryClient.invalidateQueries(
					trpc.videos.getOne.queryOptions({
						id: data.videoId,
					}),
				);
			},
		}),
	);
};
