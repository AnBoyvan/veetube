import { useClerk } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
	DEFAULT_SUBSCRIPTIONS_LIMIT,
	DEFAULT_VIDEOS_LIMIT,
} from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UseSubscriptionProps {
	userId: string;
	isSubscribed: boolean;
	fromVideoId?: string;
}

export const useSubscription = ({
	userId,
	isSubscribed,
	fromVideoId,
}: UseSubscriptionProps) => {
	const trpc = useTRPC();
	const t = useTranslations();
	const clerk = useClerk();
	const queryClient = useQueryClient();

	const subscribe = useMutation(
		trpc.subscriptions.create.mutationOptions({
			onSuccess: async () => {
				toast.success(t('user.subscribe_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.videos.getManySubscribed.infiniteQueryKey({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.users.getOne.queryKey({
						id: userId,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.subscriptions.getMany.infiniteQueryKey({
						limit: DEFAULT_SUBSCRIPTIONS_LIMIT,
					}),
				});

				if (fromVideoId) {
					await queryClient.invalidateQueries({
						queryKey: trpc.videos.getOne.queryKey({
							id: fromVideoId,
						}),
					});
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

	const unsubscribe = useMutation(
		trpc.subscriptions.remove.mutationOptions({
			onSuccess: async () => {
				toast.success(t('user.unsubscribe_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.videos.getManySubscribed.infiniteQueryKey({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.users.getOne.queryKey({
						id: userId,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.subscriptions.getMany.infiniteQueryKey({
						limit: DEFAULT_SUBSCRIPTIONS_LIMIT,
					}),
				});

				if (fromVideoId) {
					await queryClient.invalidateQueries({
						queryKey: trpc.videos.getOne.queryKey({
							id: fromVideoId,
						}),
					});
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

	const isPending = subscribe.isPending || unsubscribe.isPending;

	const onClick = () => {
		if (isSubscribed) {
			unsubscribe.mutate({ userId });
		} else {
			subscribe.mutate({ userId });
		}
	};

	return { isPending, onClick };
};
