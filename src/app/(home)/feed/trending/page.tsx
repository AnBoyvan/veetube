import { TrendingView } from '@/features/home/ui/views/trending-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const TrendingPage = async () => {
	prefetch(
		trpc.videos.getManyTrending.infiniteQueryOptions({
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<TrendingView />
		</HydrateClient>
	);
};

export default TrendingPage;
