import { VideoView } from '@/features/studio/ui/views/video-view';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface StudioVideoIdPageProps {
	params: Promise<{ videoId: string }>;
}

const StudioVideoIdPage = async ({ params }: StudioVideoIdPageProps) => {
	const { videoId } = await params;

	prefetch(trpc.studio.getOne.queryOptions({ id: videoId }));
	prefetch(trpc.categories.getMany.queryOptions());

	return (
		<HydrateClient>
			<VideoView videoId={videoId} />
		</HydrateClient>
	);
};

export default StudioVideoIdPage;
