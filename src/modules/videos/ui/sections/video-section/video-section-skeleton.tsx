import { VideoPlayerSkeleton } from '../../components/video-player-skeleton';
import { VideoTopRowSkeleton } from '../../components/video-top-row-skeleton';

export const VideoSectionSkeleton = () => {
	return (
		<>
			<VideoPlayerSkeleton />
			<VideoTopRowSkeleton />
		</>
	);
};
