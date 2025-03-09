'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ResultsSectionSkeleton } from './results-section-skeleton';
import { ResultsSectionSuspense } from './results-section-suspense';

interface ResultsSectionProps {
	query?: string;
	categoryId?: string;
}

export const ResultsSection = (props: ResultsSectionProps) => {
	return (
		<Suspense
			key={`${props.query}-${props.categoryId}`}
			fallback={<ResultsSectionSkeleton />}
		>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<ResultsSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
