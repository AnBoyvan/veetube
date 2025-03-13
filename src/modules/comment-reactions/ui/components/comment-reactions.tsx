import { useClerk } from '@clerk/nextjs';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommentGetManyOutput } from '@/modules/comments/types';
import { trpc } from '@/trpc/client';

interface CommentReactionsProps {
	comment: CommentGetManyOutput['items'][number];
}

export const CommentReactions = ({ comment }: CommentReactionsProps) => {
	const t = useTranslations();
	const clerk = useClerk();
	const utils = trpc.useUtils();

	const like = trpc.commentReactions.like.useMutation({
		onSuccess: () => {
			utils.comments.getMany.invalidate({ videoId: comment.videoId });
			if (comment.parentId) {
				utils.comments.getMany.invalidate({
					videoId: comment.videoId,
					parentId: comment.parentId,
				});
			}
		},
		onError: error => {
			toast.error(t('general.smth_wrong'));
			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

	const dislike = trpc.commentReactions.dislike.useMutation({
		onSuccess: () => {
			utils.comments.getMany.invalidate({ videoId: comment.videoId });
			if (comment.parentId) {
				utils.comments.getMany.invalidate({
					videoId: comment.videoId,
					parentId: comment.parentId,
				});
			}
		},
		onError: error => {
			toast.error(t('general.smth_wrong'));
			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
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
			<span className="text-xs text-muted-foreground">{comment.likeCount}</span>
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
			<span className="text-xs text-muted-foreground">
				{comment.dislikeCount}
			</span>
		</div>
	);
};
