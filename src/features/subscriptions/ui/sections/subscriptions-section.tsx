'use client';

import Link from 'next/link';

import { InfiniteScroll } from '@/components/common/infinite-scroll';

import { useSuspenseSubscriptions } from '../../hooks/use-suspense-subscriptions';
import {
	SubscriptionItem,
	SubscriptionItemSkeleton,
} from '../components/subscription-item';

export const SubscriptionsSection = () => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useSuspenseSubscriptions();

	return (
		<div>
			<div className="flex flex-col gap-4">
				{data.pages
					.flatMap(page => page.items)
					.map(subscription => (
						<Link
							prefetch
							key={subscription.creatorId}
							href={`/users/${subscription.user.id}`}
						>
							<SubscriptionItem
								name={subscription.user.name}
								imageUrl={subscription.user.imageUrl}
								subscriberCount={subscription.user.subscriberCount}
								userId={subscription.user.id}
							/>
						</Link>
					))}
			</div>
			<InfiniteScroll
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</div>
	);
};

export const SubscriptionsSectionSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: 8 }).map((_, idx) => (
				<SubscriptionItemSkeleton key={idx} />
			))}
		</div>
	);
};
