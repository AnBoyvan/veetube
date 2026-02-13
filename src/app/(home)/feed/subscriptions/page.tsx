import { SubscriptionsView } from '@/features/home/ui/views/subscriptions-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const SubscriptionsPage = async () => {
	prefetch(
		trpc.videos.getManyTrending.infiniteQueryOptions({
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<SubscriptionsView />
		</HydrateClient>
	);
};

export default SubscriptionsPage;
