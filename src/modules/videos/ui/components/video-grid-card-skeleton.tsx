import { VideoInfoSkeleton } from './video-info-skeleton';
import { VideoThumbnailSkeleton } from './video-thumbnail-skeleton';

export const VideoGridCardSkeleton = () => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<VideoThumbnailSkeleton />
			<VideoInfoSkeleton />
		</div>
	);
};
