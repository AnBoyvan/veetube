import { SubscriptionItemSkeleton } from '../../components/subscription-item-skeleton';

export const SubscriptionsSectionSkeleton = () => {
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: 8 }).map((_, idx) => (
				<SubscriptionItemSkeleton key={idx} />
			))}
		</div>
	);
};
