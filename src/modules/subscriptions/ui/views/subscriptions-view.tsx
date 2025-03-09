import { useTranslations } from 'next-intl';

import { SubscriptionsSection } from '../sections/subscriptions-section';

export const SubscriptionsView = () => {
	const t = useTranslations();

	return (
		<div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<div>
				<h1 className="text-2xl font-bold">{t('common.subscriptions_all')}</h1>
				<p className="text-xs text-muted-foreground">
					{t('user.manage_subscriptions')}
				</p>
			</div>
			<SubscriptionsSection />
		</div>
	);
};
