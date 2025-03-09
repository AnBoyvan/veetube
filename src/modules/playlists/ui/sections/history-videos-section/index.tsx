'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { HistoryVideosSectionSkeleton } from './history-videos-section-skeleton';
import { HistoryVideosSectionSuspense } from './history-videos-section-suspense';

export const HistoryVideosSection = () => {
	return (
		<Suspense fallback={<HistoryVideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<HistoryVideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
