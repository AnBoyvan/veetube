import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';

import type { PlaylistGetManyOutput } from '../../types';

interface PlaylistInfoProps {
	data: PlaylistGetManyOutput['items'][number];
}

export const PlaylistInfo = ({ data }: PlaylistInfoProps) => {
	const t = useTranslations();

	return (
		<div className="flex gap-3">
			<div className="min-w-0 flex-1">
				<h3 className="line-clamp-1 break-words font-medium text-sm lg:line-clamp-2">
					{data.name}
				</h3>
				<p className="text-muted-foreground text-sm">{t('common.playlist')}</p>
				<p className="font-semibold text-muted-foreground text-sm transition hover:text-primary">
					{t('playlist.view')}
				</p>
			</div>
		</div>
	);
};

export const PlaylistInfoSkeleton = () => {
	return (
		<div className="flex gap-3">
			<div className="min-w-0 flex-1">
				<Skeleton className="h-5 w-[90%]" />
				<Skeleton className="h-5 w-[50%]" />
				<Skeleton className="h-5 w-[70%]" />
			</div>
		</div>
	);
};
