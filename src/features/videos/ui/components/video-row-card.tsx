import Link from 'next/link';
import { useMemo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { useLocale, useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';
import { UserInfo } from '@/features/users/ui/components/user-info';
import { pluralize } from '@/i18n/pluralize';
import { cn } from '@/lib/utils/cn';

import type { VideoGetManyOutput } from '../../types';
import { VideoMenu } from './video-menu';
import { VideoThumbnail, VideoThumbnailSkeleton } from './video-thumbnail';

export const videoRowCardVariants = cva('group flex min-w-0', {
	variants: {
		size: {
			default: 'gap-4',
			compact: 'gap-2',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

export const thumbnailVariants = cva('relative flex-none', {
	variants: {
		size: {
			default: 'w-[38%]',
			compact: 'w-[168px]',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariants> {
	data: VideoGetManyOutput['items'][number];
	onRemove?: () => void;
}

export const VideoRowCard = ({
	data,
	size = 'default',
	onRemove,
}: VideoRowCardProps) => {
	const t = useTranslations();
	const locale = useLocale();

	const compactViews = useMemo(() => {
		return Intl.NumberFormat(locale, {
			notation: 'compact',
		}).format(data.viewCount);
	}, [data.viewCount, locale]);

	const compactLikes = useMemo(() => {
		return Intl.NumberFormat(locale, {
			notation: 'compact',
		}).format(data.likeCount);
	}, [data.likeCount, locale]);

	return (
		<div className={cn(videoRowCardVariants({ size }))}>
			<Link
				href={`/videos/${data.id}`}
				className={cn(thumbnailVariants({ size }))}
			>
				<VideoThumbnail
					imageUrl={data.thumbnailUrl}
					previewUrl={data.previewUrl}
					title={data.title}
					duration={data.duration}
				/>
			</Link>

			<div className="min-w-0 flex-1">
				<div className="flex justify-between gap-x-2">
					<Link
						href={`/videos/${data.id}`}
						className="min-2-0 flex-1 overflow-hidden"
					>
						<h3
							className={cn(
								'line-clamp-2 font-medium',
								size === 'compact' ? 'text-sm' : 'text-base',
							)}
						>
							{data.title}
						</h3>
						{size === 'default' && (
							<p className="mt-1 text-muted-foreground text-xs">
								{compactViews}
								{t(pluralize(data.viewCount, 'views'))}
								&nbsp;&bull;&nbsp;
								{compactLikes}
								{t(pluralize(data.likeCount, 'likes'))}
							</p>
						)}
						{size === 'default' && (
							<>
								<div className="my-3 flex items-center gap-2">
									<UserAvatar
										size="sm"
										imageUrl={data.user.imageUrl}
										name={data.user.name}
									/>
									<UserInfo size="sm" name={data.user.name} />
								</div>
								<Tooltip>
									<TooltipTrigger asChild>
										<p className="line-clamp-2 w-fit text-muted-foreground text-xs">
											{data.description ?? t('common.no_description')}
										</p>
									</TooltipTrigger>
									<TooltipContent side="bottom" align="center">
										<p>{t('video.from_description')}</p>
									</TooltipContent>
								</Tooltip>
							</>
						)}
						{size === 'compact' && (
							<div className="mt-1">
								<UserInfo size="sm" name={data.user.name} />
							</div>
						)}
						{size === 'compact' && (
							<p className="mt-1 truncate text-nowrap text-muted-foreground text-xs">
								{compactViews}
								{t(pluralize(data.viewCount, 'views'))}
								&nbsp;&bull;&nbsp;
								{compactLikes}
								{t(pluralize(data.likeCount, 'likes'))}
							</p>
						)}
					</Link>
					<div className="flex-none">
						<VideoMenu videoId={data.id} onRemove={onRemove} />
					</div>
				</div>
			</div>
		</div>
	);
};

interface VideoRowCardSkeletonProps
	extends VariantProps<typeof videoRowCardVariants> {}

export const VideoRowCardSkeleton = ({
	size = 'default',
}: VideoRowCardSkeletonProps) => {
	return (
		<div className={videoRowCardVariants({ size })}>
			<div className={thumbnailVariants({ size })}>
				<VideoThumbnailSkeleton />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex justify-between gap-x-2">
					<div className="min-w-0 flex-1">
						<Skeleton
							className={cn('h-5 w-[40%]', size === 'compact' && 'h-4 w-[40%]')}
						/>
						{size === 'default' && (
							<>
								<Skeleton className="mt-1 h-4 w-[20%]" />
								<div className="my-3 flex items-center gap-2">
									<Skeleton className="size-8 rounded-full" />
									<Skeleton className="h-4 w-24" />
								</div>
							</>
						)}
						{size === 'compact' && <Skeleton className="mt-1 h-4 w-[50%]" />}
					</div>
				</div>
			</div>
		</div>
	);
};
