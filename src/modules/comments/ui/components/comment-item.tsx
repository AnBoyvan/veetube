import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import { Button } from '@/components/ui/button';
import { Locale, userLocale } from '@/i18n/config';
import { pluralize } from '@/i18n/pluralize';
import { CommentReactions } from '@/modules/comment-reactions/ui/components/comment-reactions';

import { CommentGetManyOutput } from '../../types';
import { CommentForm } from './comment-form';
import { CommentMenu } from './comment-menu';
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

	const [isReplyOpen, setIsReplyOpen] = useState(false);
	const [isRepliesOpen, setIsRepliesOpen] = useState(false);

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
						<CommentReactions comment={comment} />
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
						<CommentMenu
							comment={comment}
							variant={variant}
							canRemove={comment.user.clerkId === userClerkId}
							onReplyOpen={() => setIsReplyOpen(true)}
						/>
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
						{comment.replyCount}
						{t(pluralize(comment.replyCount, 'replies'))}
					</Button>
				</div>
			)}
			{comment.replyCount > 0 && variant === 'comment' && isRepliesOpen && (
				<CommentReplies parentId={comment.id} videoId={comment.videoId} />
			)}
		</div>
	);
};
