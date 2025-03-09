'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { LikedVideosSectionSkeleton } from './liked-videos-section-skeleton';
import { LikedVideosSectionSuspense } from './liked-videos-section-suspense';

export const LikedVideosSection = () => {
	return (
		<Suspense fallback={<LikedVideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<LikedVideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
