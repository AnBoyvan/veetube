import Link from 'next/link';
import { useMemo } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { useLocale, useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { pluralize } from '@/i18n/pluralize';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/modules/users/ui/components/user-info';

import { VideoGetManyOutput } from '../../types';
import { VideoMenu } from './video-menu';
import { VideoThumbnail } from './video-thumbnail';

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
				prefetch
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

			<div className="flex-1 min-w-0">
				<div className="flex justify-between gap-x-2">
					<Link
						prefetch
						href={`/videos/${data.id}`}
						className="flex-1 min-2-0 overflow-hidden"
					>
						<h3
							className={cn(
								'font-medium line-clamp-2',
								size === 'compact' ? 'text-sm' : 'text-base',
							)}
						>
							{data.title}
						</h3>
						{size === 'default' && (
							<p className="text-xs text-muted-foreground mt-1">
								{compactViews}
								{t(pluralize(data.viewCount, 'views'))}
								&nbsp;&bull;&nbsp;
								{compactLikes}
								{t(pluralize(data.likeCount, 'likes'))}
							</p>
						)}
						{size === 'default' && (
							<>
								<div className="flex items-center gap-2 my-3">
									<UserAvatar
										size="sm"
										imageUrl={data.user.imageUrl}
										name={data.user.name}
									/>
									<UserInfo size="sm" name={data.user.name} />
								</div>
								<Tooltip>
									<TooltipTrigger asChild>
										<p className="text-xs text-muted-foreground w-fit line-clamp-2">
											{data.description ?? t('common.no_description')}
										</p>
									</TooltipTrigger>
									<TooltipContent
										side="bottom"
										align="center"
										className="bg-foreground/70 text-background"
									>
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
							<p className="text-xs text-muted-foreground mt-1 text-nowrap truncate">
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
