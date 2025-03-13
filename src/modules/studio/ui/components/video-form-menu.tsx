import { useRouter } from 'next/navigation';

import { MoreVerticalIcon, RotateCcwIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/use-confirm';
import { trpc } from '@/trpc/client';

interface VideoFormMenuProps {
	videoId: string;
}

export const VideoFormMenu = ({ videoId }: VideoFormMenuProps) => {
	const t = useTranslations();
	const router = useRouter();
	const utils = trpc.useUtils();
	const [ConfirmDialog, confirmRemove] = useConfirm(t('video.remove_confirm'));

	const revalidate = trpc.videos.revalidate.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: videoId });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});

	const remove = trpc.videos.remove.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			toast.success(t('video.remove_success'));
			router.push('/studio');
		},
		onError: () => {
			toast.error(t('video.remove_error'));
		},
	});

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
						<RotateCcwIcon className="size-4 mr-2" />
						{t('actions.revalidate')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleRemove}>
						<TrashIcon className="size-4 mr-2" />
						{t('actions.delete')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
