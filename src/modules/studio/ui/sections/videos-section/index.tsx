'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { VideosSectionSkeleton } from './videos-section-skeleton';
import { VideosSectionSuspense } from './videos-section-suspense';

export const VideosSection = () => {
	return (
		<Suspense fallback={<VideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<VideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
