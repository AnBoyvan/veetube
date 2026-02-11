import Image from 'next/image';
import { useState } from 'react';

import {
	ImagePlusIcon,
	MoreVerticalIcon,
	RotateCcwIcon,
	SparklesIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useRestoreVideoThumbnail } from '@/features/videos/hooks/use-restore-video-thumbnail';
import { THUMBNAIL_FALLBACK } from '@/lib/constants';

import { ThumbnailGenerateModal } from './thumbnail-generate-modal';
import { ThumbnailUploadModal } from './thumbnail-upload-modal';

interface VideoFormThumbnailProps {
	control: Control<any, any>;
	name: string;
	videoId: string;
	thumbnailUrl: string | null;
}

export const VideoFormThumbnail = ({
	control,
	name,
	videoId,
	thumbnailUrl,
}: VideoFormThumbnailProps) => {
	const t = useTranslations();

	const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

	const restoreThumbnail = useRestoreVideoThumbnail();

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem>
					<FormLabel>{t('common.thumbnail')}</FormLabel>
					<FormControl>
						<div className="group relative h-[84px] w-[153px] border border-secondary border-dashed p-0.5">
							<Image
								src={thumbnailUrl || THUMBNAIL_FALLBACK}
								fill
								sizes="153px"
								alt={t('common.thumbnail')}
								className="object-cover"
							/>
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
										className="absolute top-1 right-1 size-7 rounded-full bg-black/50 opacity-100 duration-300 hover:bg-black/50 group-hover:opacity-100 lg:opacity-0"
									>
										<MoreVerticalIcon className="text-white" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" side="right">
									<DropdownMenuItem
										onClick={() => setIsThumbnailModalOpen(true)}
									>
										<ImagePlusIcon className="mr-1 size-4" />
										{t('actions.change')}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setIsGenerateModalOpen(true)}
									>
										<SparklesIcon className="mr-1 size-4" />
										{t('common.ai_generated')}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => restoreThumbnail.mutate({ id: videoId })}
									>
										<RotateCcwIcon className="mr-1 size-4" />
										{t('actions.restore')}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};

export const VideoFormThumbnailSkeleton = () => {
	return (
		<div className="space-y-2">
			<Skeleton className="h-3.5 w-20" />
			<Skeleton className="h-[84px] w-[153px]" />
		</div>
	);
};
