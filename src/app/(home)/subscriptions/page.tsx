interface SearchPageProps {
	searchParams: Promise<{
		categoryId?: string;
		query?: string;
	}>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { categoryId, query } = await searchParams;

	return <div>SearchPage</div>;
};

export default SearchPage;
