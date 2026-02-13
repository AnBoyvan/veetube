import { CornerDownRightIcon, Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { useComments } from '../../hooks/use-comments';
import { CommentItem } from './comment-item';

interface CommentRepliesProps {
	parentId: string;
	videoId: string;
}

export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
	const t = useTranslations();

	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useComments({ videoId, parentId });

	return (
		<div className="pl-14">
			<div className="mt-2 flex flex-col gap-4">
				{isLoading && (
					<div className="flex items-center justify-center">
						<Loader2Icon className="size-6 animate-spin text-muted-foreground" />
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
