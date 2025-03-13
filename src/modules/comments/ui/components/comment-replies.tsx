import { CornerDownRightIcon, Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { DEFAULT_COMMENTS_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';

import { CommentItem } from './comment-item';

interface CommentRepliesProps {
	parentId: string;
	videoId: string;
}

export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
	const t = useTranslations();

	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		trpc.comments.getMany.useInfiniteQuery(
			{
				parentId,
				videoId,
				limit: DEFAULT_COMMENTS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		);

	return (
		<div className="pl-14">
			<div className="flex flex-col gap-4 mt-2">
				{isLoading && (
					<div className="flex items-center justify-center">
						<Loader2Icon className="size-6 text-muted-foreground animate-spin" />
					</div>
				)}
				{!isLoading &&
					data?.pages
						.flatMap(page => page.items)
						.map(comment => (
							<CommentItem key={comment.id} comment={comment} variant="reply" />
						))}
				{hasNextPage && (
					<Button
						size="sm"
						variant="tertiary"
						disabled={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					>
						<CornerDownRightIcon />
						{t('comment.show_replies')}
					</Button>
				)}
			</div>
		</div>
	);
};
