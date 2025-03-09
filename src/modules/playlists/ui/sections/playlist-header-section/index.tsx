'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PlaylistHeaderSectionSkeleton } from './playlist-header-section-skeleton';
import { PlaylistHeaderSectionSuspense } from './playlist-header-section-suspense';

interface PlaylistHeaderSectionSuspenseProps {
	playlistId: string;
}

export const PlaylistHeaderSection = (
	props: PlaylistHeaderSectionSuspenseProps,
) => {
	return (
		<Suspense fallback={<PlaylistHeaderSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<PlaylistHeaderSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
