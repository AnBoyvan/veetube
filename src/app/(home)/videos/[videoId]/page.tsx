import { VideoView } from '@/features/videos/ui/views/video-view';
import {
	DEFAULT_COMMENTS_LIMIT,
	DEFAULT_SUGGESTIONS_LIMIT,
} from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface VideoIdPageProps {
	params: Promise<{ videoId: string }>;
}

const VideoIdPage = async ({ params }: VideoIdPageProps) => {
	const { videoId } = await params;

	prefetch(trpc.videos.getOne.queryOptions({ id: videoId }));
	prefetch(
		trpc.suggestions.getMany.queryOptions({
			videoId,
			limit: DEFAULT_SUGGESTIONS_LIMIT,
		}),
	);
	prefetch(
		trpc.comments.getMany.queryOptions({
			videoId,
			limit: DEFAULT_COMMENTS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<VideoView videoId={videoId} />
		</HydrateClient>
	);
};

export default VideoIdPage;
