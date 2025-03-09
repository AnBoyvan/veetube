'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { CategoriesSectionSkeleton } from './categories-section-skeleton';
import { CategoriesSectionSuspense } from './categories-section-suspense';

interface CategoriesSectionProps {
	categoryId?: string;
}

export const CategoriesSection = (props: CategoriesSectionProps) => {
	return (
		<Suspense fallback={<CategoriesSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<CategoriesSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
