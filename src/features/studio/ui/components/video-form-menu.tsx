import { MoreVerticalIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRemoveVideo } from '@/features/videos/hooks/use-remove-video';
import { useRevalidateVideo } from '@/features/videos/hooks/use-revalidate-video';
import { useConfirm } from '@/hooks/use-confirm';

interface VideoFormMenuProps {
	videoId: string;
}

export const VideoFormMenu = ({ videoId }: VideoFormMenuProps) => {
	const t = useTranslations();
	const [ConfirmDialog, confirmRemove] = useConfirm(t('video.remove_confirm'));

	const revalidate = useRevalidateVideo();
	const remove = useRemoveVideo();

	const handleRemove = async () => {
		const ok = await confirmRemove();
		if (!ok) return;

		remove.mutate({ id: videoId });
	};

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" variant="ghost">
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => revalidate.mutate({ id: videoId })}>
						<RotateCcwIcon className="mr-2 size-4" />
						{t('actions.revalidate')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleRemove}>
						<TrashIcon className="mr-2 size-4" />
						{t('actions.delete')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
