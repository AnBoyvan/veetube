import { useState } from 'react';

import {
	ImagePlusIcon,
	MoreVerticalIcon,
	RotateCcwIcon,
	SparklesIcon,
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
import { trpc } from '@/trpc/client';

import { ThumbnailGenerateModal } from './thumbnail-generate-modal';
import { ThumbnailUploadModal } from './thumbnail-upload-modal';

interface ThumbnailMenuProps {
	videoId: string;
}

export const ThumbnailMenu = ({ videoId }: ThumbnailMenuProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

	const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: videoId });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});
	return (
		<>
			<ThumbnailUploadModal
				open={isThumbnailModalOpen}
				onOpenChange={setIsThumbnailModalOpen}
				videoId={videoId}
			/>
			<ThumbnailGenerateModal
				open={isGenerateModalOpen}
				onOpenChange={setIsGenerateModalOpen}
				videoId={videoId}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						type="button"
						size="icon"
						className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300 size-7"
					>
						<MoreVerticalIcon className="text-white" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" side="right">
					<DropdownMenuItem onClick={() => setIsThumbnailModalOpen(true)}>
						<ImagePlusIcon className="size-4 mr-1" />
						{t('actions.change')}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsGenerateModalOpen(true)}>
						<SparklesIcon className="size-4 mr-1" />
						{t('common.ai_generated')}
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => restoreThumbnail.mutate({ id: videoId })}
					>
						<RotateCcwIcon className="size-4 mr-1" />
						{t('actions.restore')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
