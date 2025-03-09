'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { VideoSectionSkeleton } from './video-section-skeleton';
import { VideoSectionSuspense } from './video-section-suspense';

interface VideoSectionProps {
	videoId: string;
}

export const VideoSection = (props: VideoSectionProps) => {
	return (
		<Suspense fallback={<VideoSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<VideoSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
