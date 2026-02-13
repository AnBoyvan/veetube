import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';

import { usePlaylist } from '../../hooks/use-playlist';
import { PlaylistMenu } from '../components/playlist-menu';

interface PlaylistHeaderSectionProps {
	playlistId: string;
}

export const PlaylistHeaderSection = ({
	playlistId,
}: PlaylistHeaderSectionProps) => {
	const t = useTranslations();

	const { data } = usePlaylist(playlistId);

	return (
		<div className="flex items-center justify-between gap-x-4">
			<div>
				<h1 className="font-bold text-2xl">{data.name}</h1>
				<p className="text-muted-foreground text-xs">
					{data.description
						? data.description
						: t('playlist.description_default')}
				</p>
			</div>
			<PlaylistMenu playlist={data} />
		</div>
	);
};

export const PlaylistHeaderSectionSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-2">
			<Skeleton className="h-6 w-40" />
			<Skeleton className="h-4 w-52" />
		</div>
	);
};
