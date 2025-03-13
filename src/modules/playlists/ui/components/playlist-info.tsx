import { useTranslations } from 'next-intl';

import { PlaylistGetManyOutput } from '../../types';

interface PlaylistInfoProps {
	data: PlaylistGetManyOutput['items'][number];
}

export const PlaylistInfo = ({ data }: PlaylistInfoProps) => {
	const t = useTranslations();

	return (
		<div className="flex gap-3">
			<div className="min-w-0 flex-1">
				<h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-sm break-words">
					{data.name}
				</h3>
				<p className="text-sm text-muted-foreground">{t('common.playlist')}</p>
				<p className="text-sm text-muted-foreground font-semibold hover:text-primary transition">
					{t('playlist.view')}
				</p>
			</div>
		</div>
	);
};
