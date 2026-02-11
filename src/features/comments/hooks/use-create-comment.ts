import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_COMMENTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useCreateComment = () => {
	const t = useTranslations();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const clerk = useClerk();

	return useMutation(
		trpc.comments.create.mutationOptions({
			onSuccess: async data => {
				toast.success(t('comment.add_success'));
				await queryClient.invalidateQueries(
					trpc.comments.getMany.queryOptions({
						videoId: data.videoId,
						limit: DEFAULT_COMMENTS_LIMIT,
					}),
				);
				if (data.parentId) {
					await queryClient.invalidateQueries(
						trpc.comments.getMany.queryOptions({
							videoId: data.parentId,
							limit: DEFAULT_COMMENTS_LIMIT,
						}),
					);
				}
			},
			onError: error => {
				toast.error(t('general.smth_wrong'));
				if (error.data?.code === 'UNAUTHORIZED') {
					clerk.openSignIn();
				}
			},
		}),
	);
};
