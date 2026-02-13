'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';
import {
	CategoriesSection,
	CategoriesSectionSkeleton,
} from '@/features/categories/ui/sections/categories-section';

import {
	ResultsSection,
	ResultsSectionSkeleton,
} from '../sections/results-section';

interface SearchViewProps {
	query?: string;
	categoryId?: string;
}

export const SearchView = ({ query, categoryId }: SearchViewProps) => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-[1300px] flex-col gap-y-6 px-4 pt-2.5">
			<Suspense fallback={<CategoriesSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('common.categories_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<CategoriesSection categoryId={categoryId} />
				</ErrorBoundary>
			</Suspense>
			<Suspense fallback={<ResultsSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<ResultsSection query={query} categoryId={categoryId} />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
