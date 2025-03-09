import { VideoGridCardSkeleton } from '@/modules/videos/ui/components/video-grid-card-skeleton';
import { VideoRowCardSkeleton } from '@/modules/videos/ui/components/video-row-card-skeleton';

export const VideosSectionSkeleton = () => {
	return (
		<div>
			<div className="flex md:hidden flex-col gap-4 gap-y-10">
				{Array.from({ length: 18 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
			<div className="hidden md:flex flex-col gap-4">
				{Array.from({ length: 18 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} size="compact" />
				))}
			</div>
		</div>
	);
};
