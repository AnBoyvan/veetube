import { useTranslations } from 'next-intl';

import { SubscriptionsVideosSection } from '../sections/subscriptions-videos-section';

export const SubscriptionsView = () => {
	const t = useTranslations();

	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<div>
				<h1 className="text-2xl font-bold">{t('common.subscriptions')}</h1>
				<p className="text-xs text-muted-foreground">
					{t('video.subscribed_videos')}
				</p>
			</div>
			<SubscriptionsVideosSection />
		</div>
	);
};
