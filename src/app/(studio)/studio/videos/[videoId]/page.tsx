interface StudioVideoIdPageProps {
	params: Promise<{ videoId: string }>;
}

const StudioVideoIdPage = async ({ params }: StudioVideoIdPageProps) => {
	const { videoId } = await params;

	return <div>StudioVideoIdPage</div>;
};

export default StudioVideoIdPage;
