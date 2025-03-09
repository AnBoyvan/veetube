import { useTranslations } from 'next-intl';

import { HistoryVideosSection } from '../sections/history-videos-section';

export const HistoryView = () => {
	const t = useTranslations();

	return (
		<div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<div>
				<h1 className="text-2xl font-bold">{t('common.history')}</h1>
				<p className="text-xs text-muted-foreground">
					{t('video.history_videos')}
				</p>
			</div>
			<HistoryVideosSection />
		</div>
	);
};
