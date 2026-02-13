'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	SubscriptionsVideosSection,
	SubscriptionsVideosSectionSkeleton,
} from '../sections/subscriptions-videos-section';

export const SubscriptionsView = () => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
			<div>
				<h1 className="font-bold text-2xl">{t('common.subscriptions')}</h1>
				<p className="text-muted-foreground text-xs">
					{t('video.subscribed_videos')}
				</p>
			</div>
			<Suspense fallback={<SubscriptionsVideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<SubscriptionsVideosSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
