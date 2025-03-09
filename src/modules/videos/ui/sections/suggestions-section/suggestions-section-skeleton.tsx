import { VideoGridCardSkeleton } from '../../components/video-grid-card-skeleton';
import { VideoRowCardSkeleton } from '../../components/video-row-card-skeleton';

export const SuggestionsSectionSkeleton = () => {
	return (
		<>
			<div className="hidden md:block space-y-3">
				{Array.from({ length: 8 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} size="compact" />
				))}
			</div>
			<div className="block md:hidden space-y10">
				{Array.from({ length: 8 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
		</>
	);
};
