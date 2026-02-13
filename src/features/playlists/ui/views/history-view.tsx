import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	HistoryVideosSection,
	HistoryVideosSectionSkeleton,
} from '../sections/history-videos-section';

export const HistoryView = () => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-y-6 px-4 pt-2.5">
			<div>
				<h1 className="font-bold text-2xl">{t('common.history')}</h1>
				<p className="text-muted-foreground text-xs">
					{t('video.history_videos')}
				</p>
			</div>
			<Suspense fallback={<HistoryVideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<HistoryVideosSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
