import { useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_SUGGESTIONS_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';

import { VideoGridCard } from '../../components/video-grid-card';
import { VideoRowCard } from '../../components/video-row-card';

interface SuggestionsSectionSuspenseProps {
	videoId: string;
	isManual?: boolean;
}

export const SuggestionsSectionSuspense = ({
	videoId,
	isManual,
}: SuggestionsSectionSuspenseProps) => {
	const t = useTranslations();
	const [suggestions, query] =
		trpc.suggestions.getMany.useSuspenseInfiniteQuery(
			{
				videoId,
				limit: DEFAULT_SUGGESTIONS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		);

	return (
		<>
			<div className="hidden md:block space-y-3">
				{suggestions.pages.flatMap(page =>
					page.items.map(video => (
						<VideoRowCard key={video.id} data={video} size="compact" />
					)),
				)}
			</div>
			<div className="block md:hidden space-y-10">
				{suggestions.pages.flatMap(page =>
					page.items.map(video => (
						<VideoGridCard key={video.id} data={video} />
					)),
				)}
			</div>
			<InfiniteScroll
				isManual={isManual}
				hasNextPage={query.hasNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
				fetchNextPage={query.fetchNextPage}
			/>
		</>
	);
};
