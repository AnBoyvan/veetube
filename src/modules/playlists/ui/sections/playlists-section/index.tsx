'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PlaylistsSectionSkeleton } from './playlists-section-skeleton';
import { PlaylistsSectionSuspense } from './playlists-section-suspense';

export const PlaylistsSection = () => {
	return (
		<Suspense fallback={<PlaylistsSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<PlaylistsSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};
