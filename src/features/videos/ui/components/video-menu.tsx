import { useState } from 'react';

import {
	ListPlusIcon,
	MoreVerticalIcon,
	ShareIcon,
	Trash2Icon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaylistAddModal } from '@/features/playlists/ui/components/playlist-add-modal';
import { APP_URL } from '@/lib/constants';

interface VideoMenuProps {
	videoId: string;
	variant?: 'ghost' | 'secondary';
	onRemove?: () => void;
}

export const VideoMenu = ({
	videoId,
	variant = 'ghost',
	onRemove,
}: VideoMenuProps) => {
	const t = useTranslations();

	const [isPlaylistAddOpen, setIsPlaylistAddOpen] = useState(false);

	const onShare = async () => {
		const fullUrl = `${APP_URL}/videos/${videoId}`;
		navigator.clipboard.writeText(fullUrl);
		toast.success(t('common.link_copied'));
	};

	return (
		<>
			<PlaylistAddModal
				videoId={videoId}
				open={isPlaylistAddOpen}
				onOpenChange={setIsPlaylistAddOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={variant} size="icon" className="rounded-full">
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
					<DropdownMenuItem onClick={onShare}>
						<ShareIcon />
						{t('actions.share')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsPlaylistAddOpen(true)}>
						<ListPlusIcon />
						{t('video.add_to_playlist')}
					</DropdownMenuItem>
					{onRemove && (
						<DropdownMenuItem onClick={onRemove}>
							<Trash2Icon />
							{t('actions.remove')}
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
