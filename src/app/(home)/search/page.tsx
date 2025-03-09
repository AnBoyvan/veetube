import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { SearchView } from '@/modules/search/ui/views/search-view';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

interface PageProps {
	searchParams: Promise<{
		categoryId?: string;
		query?: string;
	}>;
}

const Page = async ({ searchParams }: PageProps) => {
	const { categoryId, query } = await searchParams;

	void trpc.categories.getMany.prefetch();
	void trpc.search.getMany.prefetchInfinite({
		query,
		categoryId,
		limit: DEFAULT_VIDEOS_LIMIT,
	});

	return (
		<HydrateClient>
			<SearchView query={query} categoryId={categoryId} />
		</HydrateClient>
	);
};

export default Page;
