'use client';

import Link from 'next/link';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_SUBSCRIPTIONS_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';

import { SubscriptionItem } from '../../components/subscription-item';

export const SubscriptionsSectionSuspense = () => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const [subscriptions, query] =
		trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
			{
				limit: DEFAULT_SUBSCRIPTIONS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		);

	const unsubscribe = trpc.subscriptions.remove.useMutation({
		onSuccess: data => {
			toast.success(t('user.unsubscribe_success'));
			utils.videos.getManySubscribed.invalidate();
			utils.users.getOne.invalidate({ id: data.creatorId });
			utils.subscriptions.getMany.invalidate();
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	return (
		<div>
			<div className="flex flex-col gap-4">
				{subscriptions.pages
					.flatMap(page => page.items)
					.map(subscription => (
						<Link
							prefetch
							key={subscription.creatorId}
							href={`/user/${subscription.user.id}`}
						>
							<SubscriptionItem
								name={subscription.user.name}
								imageUrl={subscription.user.imageUrl}
								subscriberCount={subscription.user.subscriberCount}
								onUnsubscride={() => {
									unsubscribe.mutate({ userId: subscription.creatorId });
								}}
								disabled={unsubscribe.isPending}
							/>
						</Link>
					))}
			</div>
			<InfiniteScroll
				hasNextPage={query.hasNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
				fetchNextPage={query.fetchNextPage}
			/>
		</div>
	);
};
