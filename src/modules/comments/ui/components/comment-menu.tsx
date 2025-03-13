import { useClerk } from '@clerk/nextjs';
import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trpc } from '@/trpc/client';

import { CommentGetManyOutput } from '../../types';

interface CommentMenuProps {
	comment: CommentGetManyOutput['items'][number];
	variant?: 'reply' | 'comment';
	canRemove?: boolean;
	onReplyOpen: () => void;
}

export const CommentMenu = ({
	comment,
	variant,
	canRemove,
	onReplyOpen,
}: CommentMenuProps) => {
	const t = useTranslations();
	const clerk = useClerk();
	const utils = trpc.useUtils();

	const remove = trpc.comments.remove.useMutation({
		onSuccess: () => {
			toast.success(t('comment.remove_success'));
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="size-8">
					<MoreVerticalIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{variant === 'comment' && (
					<DropdownMenuItem onClick={onReplyOpen}>
						<MessageSquareIcon className="size-4" />
						{t('actions.reply')}
					</DropdownMenuItem>
				)}
				{canRemove && (
					<DropdownMenuItem onClick={() => remove.mutate({ id: comment.id })}>
						<Trash2Icon className="size-4" />
						{t('actions.delete')}
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
