'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { SubscriptionsVideosSectionSkeleton } from './subscriptions-videos-section-skeleton';
import { SubscriptionsVideosSectionSuspense } from './subscriptions-videos-section-suspense';

export const SubscriptionsVideosSection = () => {
	return (
		<Suspense fallback={<SubscriptionsVideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<SubscriptionsVideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
