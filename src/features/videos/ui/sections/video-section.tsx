import { useAuth } from '@clerk/nextjs';

import { useSetVideoView } from '@/features/video-views/hooks/use-set-video-view';
import { cn } from '@/lib/utils/cn';

import { useVideoById } from '../../hooks/use-video-by-id';
import { VideoBanner } from '../components/video-banner';
import { VideoPlayer, VideoPlayerSkeleton } from '../components/video-player';
import { VideoTopRow, VideoTopRowSkeleton } from '../components/video-top-row';

interface VideoSectionProps {
	videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
	const { isSignedIn } = useAuth();

	const { data: video } = useVideoById(videoId);

	const createView = useSetVideoView();

	const handlePlay = () => {
		if (!isSignedIn) return;

		createView.mutate({ videoId });
	};

	return (
		<>
			<div
				className={cn(
					'relative aspect-video overflow-hidden rounded-xl bg-black',
					video.muxStatus !== 'ready' && 'rounded-b-none',
				)}
			>
				<VideoPlayer
					autoPlay
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

export const VideoSectionSkeleton = () => {
	return (
		<>
			<VideoPlayerSkeleton />
			<VideoTopRowSkeleton />
		</>
	);
};
