'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	TrendingVideosSection,
	TrendingVideosSectionSkeleton,
} from '../sections/trending-videos-section';

export const TrendingView = () => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
			<div>
				<h1 className="font-bold text-2xl">{t('common.trending')}</h1>
				<p className="text-muted-foreground text-xs">
					{t('video.most_popular')}
				</p>
			</div>
			<Suspense fallback={<TrendingVideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<TrendingVideosSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
