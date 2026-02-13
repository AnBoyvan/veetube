import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { useSuggestions } from '@/features/suggestions/hooks/use-suggestions';

import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '../components/video-grid-card';
import {
	VideoRowCard,
	VideoRowCardSkeleton,
} from '../components/video-row-card';

interface SuggestionsSectionProps {
	videoId: string;
	isManual?: boolean;
}

export const SuggestionsSection = ({
	videoId,
	isManual,
}: SuggestionsSectionProps) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useSuggestions(videoId);

	return (
		<>
			<div className="hidden space-y-3 md:block">
				{data.pages.flatMap(page =>
					page.items.map(video => (
						<VideoRowCard key={video.id} data={video} size="compact" />
					)),
				)}
			</div>
			<div className="block space-y-10 md:hidden">
				{data.pages.flatMap(page =>
					page.items.map(video => (
						<VideoGridCard key={video.id} data={video} />
					)),
				)}
			</div>
			<InfiniteScroll
				isManual={isManual}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</>
	);
};

export const SuggestionsSectionSkeleton = () => {
	return (
		<>
			<div className="hidden space-y-3 md:block">
				{Array.from({ length: 8 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} size="compact" />
				))}
			</div>
			<div className="space-y10 block md:hidden">
				{Array.from({ length: 8 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
		</>
	);
};
