import { DEFAULT_COMMENTS_LIMIT, DEFAULT_SUGGESTIONS_LIMIT } from '@/constants';
import { VideoView } from '@/modules/videos/ui/view/video-view';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

interface PageProps {
	params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
	const { videoId } = await params;

	void trpc.videos.getOne.prefetch({ id: videoId });
	void trpc.comments.getMany.prefetchInfinite({
		videoId,
		limit: DEFAULT_COMMENTS_LIMIT,
	});
	void trpc.suggestions.getMany.prefetchInfinite({
		videoId,
		limit: DEFAULT_SUGGESTIONS_LIMIT,
	});

	return (
		<HydrateClient>
			<VideoView videoId={videoId} />
		</HydrateClient>
	);
};

export default Page;
