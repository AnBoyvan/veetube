'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { SuggestionsSectionSkeleton } from './suggestions-section-skeleton';
import { SuggestionsSectionSuspense } from './suggestions-section-suspense';

interface SuggestionsSectionProps {
	videoId: string;
	isManual?: boolean;
}

export const SuggestionsSection = (props: SuggestionsSectionProps) => {
	return (
		<Suspense fallback={<SuggestionsSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<SuggestionsSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
