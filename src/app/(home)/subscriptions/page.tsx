import { SubscriptionsView } from '@/features/subscriptions/ui/views/subscriptions-view';
import { DEFAULT_SUBSCRIPTIONS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const SubscriptionsPage = async () => {
	prefetch(
		trpc.subscriptions.getMany.infiniteQueryOptions({
			limit: DEFAULT_SUBSCRIPTIONS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<SubscriptionsView />
		</HydrateClient>
	);
};

export default SubscriptionsPage;
