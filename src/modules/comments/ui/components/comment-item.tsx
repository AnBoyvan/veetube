import Link from 'next/link';
import { useState } from 'react';

import { useAuth, useClerk } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { formatDistanceToNow } from 'date-fns';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	MessageSquareIcon,
	MoreVerticalIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
	Trash2Icon,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { UserAvatar } from '@/components/common/user-avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale, userLocale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

import { CommentGetManyOutput } from '../../types';
import { CommentForm } from './comment-form';
import { CommentReplies } from './comment-replies';

interface CommentItemProps {
	comment: CommentGetManyOutput['items'][number];
	variant?: 'reply' | 'comment';
}

export const CommentItem = ({
	comment,
	variant = 'comment',
}: CommentItemProps) => {
	const t = useTranslations();
	const locale = useLocale();
	const { userId: userClerkId } = useAuth();
	const clerk = useClerk();
	const { theme } = useTheme();
	const utils = trpc.useUtils();

	const [isReplyOpen, setIsReplyOpen] = useState(false);
	const [isRepliesOpen, setIsRepliesOpen] = useState(false);

	const remove = trpc.comments.remove.useMutation({
		onSuccess: () => {
			toast.success(t('video.comment_removed'));
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
				clerk.openSignIn({
					appearance: {
						baseTheme: theme === 'dark' ? dark : undefined,
					},
				});
			}
		},
	});

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
				clerk.openSignIn({
					appearance: {
						baseTheme: theme === 'dark' ? dark : undefined,
					},
				});
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
				clerk.openSignIn({
					appearance: {
						baseTheme: theme === 'dark' ? dark : undefined,
					},
				});
			}
		},
	});

	return (
		<div>
			<div className="flex gap-4">
				<Link prefetch href={`/users/${comment.userId}`}>
					<UserAvatar
						size={variant === 'comment' ? 'lg' : 'sm'}
						imageUrl={comment.user.imageUrl}
						name={comment.user.name}
					/>
				</Link>
				<div className="flex-1 min-w-0">
					<Link prefetch href={`/users/${comment.userId}`}>
						<div className="flex items-center gap-2 mb-05">
							<span className="font-medium text-sm pb-0.5">
								{comment.user.name}
							</span>
							<span className="text-xs text-muted-foreground">
								{formatDistanceToNow(comment.createdAt, {
									addSuffix: true,
									locale: userLocale[locale as Locale],
								})}
							</span>
						</div>
					</Link>
					<p className="text-sm">{comment.value}</p>
					<div className="flex items-center gap-2 mt-1">
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
										comment.viewerReaction === 'like' &&
											'fill-secondary-foreground',
									)}
								/>
							</Button>
							<span className="text-xs text-muted-foreground">
								{comment.likeCount}
							</span>
							<Button
								size="icon"
								variant="ghost"
								disabled={like.isPending || dislike.isPending}
								onClick={() => dislike.mutate({ commentId: comment.id })}
								className="size-8"
							>
								<ThumbsDownIcon
									className={cn(
										comment.viewerReaction === 'dislike' &&
											'fill-secondary-foreground',
									)}
								/>
							</Button>
							<span className="text-xs text-muted-foreground">
								{comment.dislikeCount}
							</span>
						</div>
						{variant === 'comment' && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsReplyOpen(true)}
								className="h-8"
							>
								{t('actions.reply')}
							</Button>
						)}
					</div>
				</div>
				{(variant === 'comment' && comment.user.clerkId !== userClerkId) ||
					(comment.user.clerkId === userClerkId && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="size-8">
									<MoreVerticalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{variant === 'comment' && (
									<DropdownMenuItem onClick={() => setIsReplyOpen(true)}>
										<MessageSquareIcon className="size-4" />
										{t('actions.reply')}
									</DropdownMenuItem>
								)}
								{comment.user.clerkId === userClerkId && (
									<DropdownMenuItem
										onClick={() => remove.mutate({ id: comment.id })}
									>
										<Trash2Icon className="size-4" />
										{t('actions.delete')}
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					))}
			</div>
			{isReplyOpen && variant === 'comment' && (
				<div className="mt-4 pl-14">
					<CommentForm
						videoId={comment.videoId}
						parentId={comment.id}
						variant="reply"
						onSuccess={() => {
							setIsReplyOpen(false);
							setIsRepliesOpen(true);
						}}
						onCancel={() => setIsReplyOpen(false)}
					/>
				</div>
			)}
			{comment.replyCount > 0 && variant === 'comment' && (
				<div className="pl-14">
					<Button
						size="sm"
						variant="tertiary"
						onClick={() => setIsRepliesOpen(prev => !prev)}
					>
						{isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						{t('common.replies')}:&nbsp;{comment.replyCount}
					</Button>
				</div>
			)}
			{comment.replyCount > 0 && variant === 'comment' && isRepliesOpen && (
				<CommentReplies parentId={comment.id} videoId={comment.videoId} />
			)}
		</div>
	);
};
