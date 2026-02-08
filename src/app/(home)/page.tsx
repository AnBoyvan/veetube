import { HomeView } from '@/features/home/ui/views/home-view';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface HomePageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
	const { categoryId } = await searchParams;

	prefetch(trpc.categories.getMany.queryOptions());

	return (
		<HydrateClient>
			<HomeView categoryId={categoryId} />
		</HydrateClient>
	);
};

export default HomePage;
