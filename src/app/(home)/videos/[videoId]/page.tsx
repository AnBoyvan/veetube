interface VideoIdPageProps {
	params: Promise<{ videoId: string }>;
}

const VideoIdPage = async ({ params }: VideoIdPageProps) => {
	const { videoId } = await params;

	return <div>VideoIdPage</div>;
};

export default VideoIdPage;
