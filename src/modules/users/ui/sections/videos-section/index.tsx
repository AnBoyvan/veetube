'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { VideosSectionSkeleton } from './videos-section-skeleton';
import { VideosSectionSuspense } from './videos-section-suspense';

interface VideosSectionProps {
	userId: string;
}

export const VideosSection = (props: VideosSectionProps) => {
	return (
		<Suspense fallback={<VideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<VideosSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
