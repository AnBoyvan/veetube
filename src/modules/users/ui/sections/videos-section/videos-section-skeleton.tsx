import { VideoGridCardSkeleton } from '@/modules/videos/ui/components/video-grid-card-skeleton';

export const VideosSectionSkeleton = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-10">
			{Array.from({ length: 18 }).map((_, idx) => (
				<VideoGridCardSkeleton key={idx} />
			))}
		</div>
	);
};
