import { useState } from 'react';

import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/use-confirm';

import { useRemovePlaylist } from '../../hooks/use-remove-playlist';
import type { PlaylistGetOneOutput } from '../../types';
import { PlaylistEditModal } from './playlist-edit-modal';

interface PlaylistMenuProps {
	playlist: PlaylistGetOneOutput;
}

export const PlaylistMenu = ({ playlist }: PlaylistMenuProps) => {
	const t = useTranslations();
	const [ConfirmDialog, confirmRemove] = useConfirm(
		t('playlist.remove_confirm'),
	);

	const [isEditOpen, setIsEditOpen] = useState(false);

	const remove = useRemovePlaylist();

	const handleRemove = async () => {
		const ok = await confirmRemove();
		if (!ok) return;

		remove.mutate({ id: playlist.id });
	};

	return (
		<>
			<PlaylistEditModal
				playlist={playlist}
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
			/>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 rounded-full"
					>
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setIsEditOpen(true)}>
						<Edit2Icon />
						{t('actions.edit')}
					</DropdownMenuItem>

					<DropdownMenuItem onClick={handleRemove}>
						<Trash2Icon />
						{t('actions.remove')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
