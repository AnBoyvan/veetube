'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { TrendingVideosSectionSkeleton } from './trending-videos-section-skeleton';
import { TrendingVideosSectionSuspense } from './trending-videos-section-suspense';

export const TrendingVideosSection = () => {
	return (
		<Suspense fallback={<TrendingVideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<TrendingVideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
