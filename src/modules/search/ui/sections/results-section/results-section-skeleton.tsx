import { VideoGridCardSkeleton } from '@/modules/videos/ui/components/video-grid-card-skeleton';
import { VideoRowCardSkeleton } from '@/modules/videos/ui/components/video-row-card-skeleton';

export const ResultsSectionSkeleton = () => {
	return (
		<div>
			<div className="hidden md:flex flex-col gap-4">
				{Array.from({ length: 5 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} />
				))}
			</div>
			<div className="flex md:hidden flex-col gap-4 p-4 gap-y-10 pt-6">
				{Array.from({ length: 5 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
		</div>
	);
};
