'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { SubscriptionsSectionSkeleton } from './subscriptions-section-skeleton';
import { SubscriptionsSectionSuspense } from './subscriptions-section-suspense';

export const SubscriptionsSection = () => {
	return (
		<Suspense fallback={<SubscriptionsSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<SubscriptionsSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
