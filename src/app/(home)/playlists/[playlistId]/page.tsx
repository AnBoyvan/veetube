interface PlaylistIdPageProps {
	params: Promise<{ playlistId: string }>;
}

const PlaylistIdPage = async ({ params }: PlaylistIdPageProps) => {
	const { playlistId } = await params;

	return <div>PlaylistIdPage</div>;
};

export default PlaylistIdPage;
