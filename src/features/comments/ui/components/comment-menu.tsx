import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useRemoveComment } from '../../hooks/use-remove-comment';
import type { CommentGetManyOutput } from '../../types';

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

	const remove = useRemoveComment();

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
