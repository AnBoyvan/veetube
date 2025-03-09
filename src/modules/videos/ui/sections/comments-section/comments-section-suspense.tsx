import { useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { DEFAULT_COMMENTS_LIMIT } from '@/constants';
import { CommentForm } from '@/modules/comments/ui/components/comment-form';
import { CommentItem } from '@/modules/comments/ui/components/comment-item';
import { trpc } from '@/trpc/client';

interface CommentsSectionSuspenseProps {
	videoId: string;
}

export const CommentsSectionSuspense = ({
	videoId,
}: CommentsSectionSuspenseProps) => {
	const t = useTranslations();
	const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
		{
			videoId,
			limit: DEFAULT_COMMENTS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-6">
				<h1 className="text-xl font-bold">
					{comments.pages[0].totalCount}
					{t('common.comments_pl')}
				</h1>
				<CommentForm videoId={videoId} />
				<div className="flex flex-col gap-4 mt-2">
					{comments.pages
						.flatMap(page => page.items)
						.map(comment => (
							<CommentItem key={comment.id} comment={comment} />
						))}
					<InfiniteScroll
						hasNextPage={query.hasNextPage}
						isFetchingNextPage={query.isFetchingNextPage}
						fetchNextPage={query.fetchNextPage}
					/>
				</div>
			</div>
		</div>
	);
};
