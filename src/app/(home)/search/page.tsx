import { SearchView } from '@/features/search/ui/views/search-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface SearchPageProps {
	searchParams: Promise<{
		categoryId?: string;
		query?: string;
	}>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { categoryId, query } = await searchParams;

	prefetch(trpc.categories.getMany.queryOptions());
	prefetch(
		trpc.search.getMany.infiniteQueryOptions({
			query,
			categoryId,
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<SearchView categoryId={categoryId} query={query} />
		</HydrateClient>
	);
};

export default SearchPage;
