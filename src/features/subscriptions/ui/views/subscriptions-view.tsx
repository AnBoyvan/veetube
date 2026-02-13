'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	SubscriptionsSection,
	SubscriptionsSectionSkeleton,
} from '../sections/subscriptions-section';

export const SubscriptionsView = () => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-y-6 px-4 pt-2.5">
			<div>
				<h1 className="font-bold text-2xl">{t('common.subscriptions_all')}</h1>
				<p className="text-muted-foreground text-xs">
					{t('user.manage_subscriptions')}
				</p>
			</div>
			<Suspense fallback={<SubscriptionsSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('common.subscriptions_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<SubscriptionsSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
