import { PlaylistInfoSkeleton } from './playlist-info-skeleton';
import { PlaylistThumbnailSkeleton } from './playlist-thumbnail-skeleton';

export const PlaylistGridCardSkeleton = () => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<PlaylistThumbnailSkeleton />
			<PlaylistInfoSkeleton />
		</div>
	);
};
