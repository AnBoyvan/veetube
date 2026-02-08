'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	CategoriesSection,
	CategoriesSectionSkeleton,
} from '../sections/categories-section';

interface HomeViewProps {
	categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
	const t = useTranslations();
	return (
		<div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
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
		</div>
	);
};
