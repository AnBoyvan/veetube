'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { HomeVideosSectionSkeleton } from './home-videos-section-skeleton';
import { HomeVideosSectionSuspense } from './home-videos-section-suspense';

interface HomeVideosSectionProps {
	categoryId?: string;
}

export const HomeVideosSection = (props: HomeVideosSectionProps) => {
	return (
		<Suspense key={props.categoryId} fallback={<HomeVideosSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<HomeVideosSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
