import Link from 'next/link';
import { useMemo } from 'react';

import { formatDistanceToNow } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import { Locale, userLocale } from '@/i18n/config';
import { UserInfo } from '@/modules/users/ui/components/user-info';

import { VideoGetManyOutput } from '../../types';
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

	const compactDate = useMemo(() => {
		return formatDistanceToNow(data.createdAt, {
			addSuffix: true,
			locale: userLocale[locale as Locale],
		});
	}, [data.createdAt, locale]);

	return (
		<div className="flex gap-3">
			<Link prefetch href={`/users/${data.user.id}`}>
				<UserAvatar
					size="sm"
					imageUrl={data.user.imageUrl}
					name={data.user.name}
				/>
			</Link>
			<div className="min-w-0 flex-1">
				<Link prefetch href={`/videos/${data.id}`}>
					<h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
						{data.title}
					</h3>
				</Link>
				<Link prefetch href={`/users/${data.user.id}`}>
					<UserInfo name={data.user.name} />
				</Link>
				<Link prefetch href={`/videos/${data.id}`}>
					<p className="text-sm text-muted-foreground line-clamp-1">
						{compactViews}
						{t('common.views_pl')}
						&nbsp;&bull;&nbsp;
						{compactLikes}
						{t('common.likes_pl')}
					</p>
				</Link>
			</div>
			<div className="flex-shink-0">
				<VideoMenu videoId={data.id} onRemove={onRemove} />
			</div>
		</div>
	);
};
