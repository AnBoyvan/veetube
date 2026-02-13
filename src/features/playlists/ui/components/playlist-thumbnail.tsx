import Image from 'next/image';
import { useMemo } from 'react';

import { ListVideoIcon, PlayIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';
import { pluralize } from '@/i18n/pluralize';
import { THUMBNAIL_FALLBACK } from '@/lib/constants';
import { cn } from '@/lib/utils/cn';

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
		<div className={cn('group relative pt-3', className)}>
			<div className="relative">
				<div className="absolute -top-3 left-1/2 aspect-video w-[96%] -translate-x-1/2 overflow-hidden rounded-xl bg-foreground/20" />
				<div className="absolute -top-1.5 left-1/2 aspect-video w-[98%] -translate-x-1/2 overflow-hidden rounded-xl bg-foreground/25" />
				<div className="relative aspect-video w-full overflow-hidden rounded-xl">
					<Image
						src={imageUrl || THUMBNAIL_FALLBACK}
						alt={title}
						fill
						sizes="(min-width: 2820px) 381px, (min-width: 2200px) calc(12.67vw + 26px), (min-width: 1920px) calc(20vw - 70px), (min-width: 1540px) calc(25vw - 84px), (min-width: 1040px) calc(33.33vw - 109px), (min-width: 780px) calc(50vw - 155px), (min-width: 640px) calc(50vw - 27px), calc(100vw - 38px)"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
						<div className="flex items-center gap-x-2">
							<PlayIcon className="size-4 fill-white text-white" />
							<span className="font-medium text-white">
								{t('actions.play_all')}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute right-2 bottom-2 flex items-center gap-x-1 rounded bg-black/80 px-1 py-0.5 font-medium text-white text-xs">
				<ListVideoIcon className="size-4" />
				{compactViews}
				{t(pluralize(videoCount, 'videos'))}
			</div>
		</div>
	);
};

export const PlaylistThumbnailSkeleton = () => {
	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-xl">
			<Skeleton className="size-full" />
		</div>
	);
};
