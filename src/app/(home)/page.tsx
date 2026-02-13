import { HomeView } from '@/features/home/ui/views/home-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface HomePageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
	const { categoryId } = await searchParams;

	prefetch(trpc.categories.getMany.queryOptions());
	prefetch(
		trpc.videos.getMany.infiniteQueryOptions({
			categoryId,
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<HomeView categoryId={categoryId} />
		</HydrateClient>
	);
};

export default HomePage;
