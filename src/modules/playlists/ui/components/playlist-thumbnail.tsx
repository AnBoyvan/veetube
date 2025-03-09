import Image from 'next/image';
import { useMemo } from 'react';

import { ListVideoIcon, PlayIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { THUMBNAIL_FALLBACK } from '@/constants';
import { cn } from '@/lib/utils';

interface PlaylistThumbnailProps {
	title: string;
	videoCount: number;
	imageUrl?: string | null;
	className?: string;
}

export const PlaylistThumbnail = ({
	title,
	videoCount,
	imageUrl,
	className,
}: PlaylistThumbnailProps) => {
	const t = useTranslations();
	const locale = useLocale();

	const compactViews = useMemo(() => {
		return Intl.NumberFormat(locale, {
			notation: 'compact',
		}).format(videoCount);
	}, [videoCount, locale]);

	return (
		<div className={cn('relative pt-3 group', className)}>
			<div className="relative">
				<div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[96%] overflow-hidden rounded-xl bg-foreground/20 aspect-video" />
				<div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[98%] overflow-hidden rounded-xl bg-foreground/25 aspect-video" />
				<div className="relative overflow-hidden w-full rounded-xl aspect-video">
					<Image
						src={imageUrl || THUMBNAIL_FALLBACK}
						alt={title}
						fill
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<div className="flex items-center gap-x-2">
							<PlayIcon className="size-4 text-white fill-white" />
							<span className="text-white font-medium">
								{t('actions.play_all')}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium flex items-center gap-x-1">
				<ListVideoIcon className="size-4" />
				{compactViews}
				{t('common.videos_pl')}
			</div>
		</div>
	);
};
