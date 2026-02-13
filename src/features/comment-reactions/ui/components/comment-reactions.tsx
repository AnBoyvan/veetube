import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { CommentGetManyOutput } from '@/features/comments/types';
import { cn } from '@/lib/utils/cn';

import { useDislikeComment } from '../../hooks/use-dislike-comment';
import { useLikeComment } from '../../hooks/use-like-comment';

interface CommentReactionsProps {
	comment: CommentGetManyOutput['items'][number];
}

export const CommentReactions = ({ comment }: CommentReactionsProps) => {
	const like = useLikeComment({
		videoId: comment.videoId,
		parentId: comment.parentId,
	});

	const dislike = useDislikeComment({
		videoId: comment.videoId,
		parentId: comment.parentId,
	});

	return (
		<div className="flex items-center">
			<Button
				size="icon"
				variant="ghost"
				disabled={like.isPending || dislike.isPending}
				onClick={() => like.mutate({ commentId: comment.id })}
				className="size-8"
			>
				<ThumbsUpIcon
					className={cn(
						comment.viewerReaction === 'like' && 'fill-secondary-foreground',
					)}
				/>
			</Button>
			<span className="text-muted-foreground text-xs">{comment.likeCount}</span>
			<Button
				size="icon"
				variant="ghost"
				disabled={like.isPending || dislike.isPending}
				onClick={() => dislike.mutate({ commentId: comment.id })}
				className="size-8"
			>
				<ThumbsDownIcon
					className={cn(
						comment.viewerReaction === 'dislike' && 'fill-secondary-foreground',
					)}
				/>
			</Button>
			<span className="text-muted-foreground text-xs">
				{comment.dislikeCount}
			</span>
		</div>
	);
};
