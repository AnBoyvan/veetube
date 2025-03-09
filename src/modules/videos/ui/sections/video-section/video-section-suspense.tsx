import { useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

import { VideoBanner } from '../../components/video-banner';
import { VideoPlayer } from '../../components/video-player';
import { VideoTopRow } from '../../components/video-top-row';

interface VideoSectionSuspenseProps {
	videoId: string;
}

export const VideoSectionSuspense = ({
	videoId,
}: VideoSectionSuspenseProps) => {
	const { isSignedIn } = useAuth();
	const utils = trpc.useUtils();

	const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

	const createView = trpc.videoViews.create.useMutation({
		onSuccess: () => {
			utils.videos.getOne.invalidate({ id: videoId });
		},
	});

	const handlePlay = () => {
		if (!isSignedIn) return;

		createView.mutate({ videoId });
	};

	return (
		<>
			<div
				className={cn(
					'aspect-video bg-black rounded-xl overflow-hidden relative',
					video.muxStatus !== 'ready' && 'rounded-b-none',
				)}
			>
				<VideoPlayer
					onPlay={handlePlay}
					playbackId={video.muxPlaybackId}
					thumbnailUrl={video.thumbnailUrl}
				/>
			</div>
			<VideoBanner status={video.muxStatus} />
			<VideoTopRow video={video} />
		</>
	);
};
