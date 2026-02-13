import { InfiniteScroll } from '@/components/common/infinite-scroll';
import {
	VideoGridCard,
	VideoGridCardSkeleton,
} from '@/features/videos/ui/components/video-grid-card';
import {
	VideoRowCard,
	VideoRowCardSkeleton,
} from '@/features/videos/ui/components/video-row-card';

import { useSearch } from '../../hooks/use-search';

interface ResultsSectionProps {
	query?: string;
	categoryId?: string;
}

export const ResultsSection = ({ query, categoryId }: ResultsSectionProps) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearch({
		query,
		categoryId,
	});

	return (
		<>
			<div className="flex flex-col gap-4 gap-y-10 md:hidden">
				{data.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoGridCard key={video.id} data={video} />
					))}
			</div>
			<div className="hidden flex-col gap-4 md:flex">
				{data.pages
					.flatMap(page => page.items)
					.map(video => (
						<VideoRowCard key={video.id} data={video} />
					))}
			</div>
			<InfiniteScroll
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</>
	);
};

export const ResultsSectionSkeleton = () => {
	return (
		<div>
			<div className="hidden flex-col gap-4 md:flex">
				{Array.from({ length: 5 }).map((_, idx) => (
					<VideoRowCardSkeleton key={idx} />
				))}
			</div>
			<div className="flex flex-col gap-4 gap-y-10 p-4 pt-6 md:hidden">
				{Array.from({ length: 5 }).map((_, idx) => (
					<VideoGridCardSkeleton key={idx} />
				))}
			</div>
		</div>
	);
};
