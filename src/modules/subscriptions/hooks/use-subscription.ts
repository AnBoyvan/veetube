import { useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { trpc } from '@/trpc/client';

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
	const t = useTranslations();
	const clerk = useClerk();
	const utils = trpc.useUtils();

	const subscribe = trpc.subscriptions.create.useMutation({
		onSuccess: () => {
			toast.success(t('user.subscribe_success'));
			utils.videos.getManySubscribed.invalidate();
			utils.users.getOne.invalidate({ id: userId });
			utils.subscriptions.getMany.invalidate();

			if (fromVideoId) {
				utils.videos.getOne.invalidate({ id: fromVideoId });
			}
		},
		onError: error => {
			toast.error(t('general.smth_wrong'));

			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

	const unsubscribe = trpc.subscriptions.remove.useMutation({
		onSuccess: () => {
			toast.success(t('user.unsubscribe_success'));
			utils.videos.getManySubscribed.invalidate();
			utils.users.getOne.invalidate({ id: userId });
			utils.subscriptions.getMany.invalidate();

			if (fromVideoId) {
				utils.videos.getOne.invalidate({ id: fromVideoId });
			}
		},
		onError: error => {
			toast.error(t('general.smth_wrong'));

			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

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
