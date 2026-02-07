interface HomePageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
	const { categoryId } = await searchParams;

	return <div>HomePage</div>;
};

export default HomePage;
