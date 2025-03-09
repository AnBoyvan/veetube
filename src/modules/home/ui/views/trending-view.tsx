import { useTranslations } from 'next-intl';

import { TrendingVideosSection } from '../sections/trending-videos-section';

export const TrendingView = () => {
	const t = useTranslations();

	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<div>
				<h1 className="text-2xl font-bold">{t('common.trending')}</h1>
				<p className="text-xs text-muted-foreground">
					{t('video.most_popular')}
				</p>
			</div>
			<TrendingVideosSection />
		</div>
	);
};
