import Link from 'next/link';
import { useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';
import { UserInfo } from '@/features/users/ui/components/user-info';
import { pluralize } from '@/i18n/pluralize';

import type { VideoGetManyOutput } from '../../types';
import { VideoMenu } from './video-menu';

interface VideoInfoProps {
	data: VideoGetManyOutput['items'][number];
	onRemove?: () => void;
}

export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
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
		<div className="flex gap-3">
			<Link href={`/users/${data.user.id}`}>
				<UserAvatar
					size="sm"
					imageUrl={data.user.imageUrl}
					name={data.user.name}
				/>
			</Link>
			<div className="min-w-0 flex-1">
				<Link href={`/videos/${data.id}`}>
					<h3 className="line-clamp-1 break-words font-medium text-base lg:line-clamp-2">
						{data.title}
					</h3>
				</Link>
				<Link href={`/users/${data.user.id}`}>
					<UserInfo name={data.user.name} />
				</Link>
				<Link href={`/videos/${data.id}`}>
					<p className="line-clamp-1 text-muted-foreground text-sm">
						{compactViews}
						{t(pluralize(data.viewCount, 'views'))}
						&nbsp;&bull;&nbsp;
						{compactLikes}
						{t(pluralize(data.likeCount, 'likes'))}
					</p>
				</Link>
			</div>
			<div className="flex-shink-0">
				<VideoMenu videoId={data.id} onRemove={onRemove} />
			</div>
		</div>
	);
};

export const VideoInfoSkeleton = () => {
	return (
		<div className="flex gap-3">
			<Skeleton className="size-10 shrink-0 rounded-full" />
			<div className="min-w-0 flex-1 space-y-2">
				<Skeleton className="h-5 w-[90%]" />
				<Skeleton className="h-5 w-[70%]" />
			</div>
		</div>
	);
};
