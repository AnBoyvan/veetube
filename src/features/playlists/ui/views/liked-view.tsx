import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	LikedVideosSection,
	LikedVideosSectionSkeleton,
} from '../sections/liked-videos-section';

export const LikedView = () => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-y-6 px-4 pt-2.5">
			<h1 className="font-bold text-2xl">{t('video.liked')}</h1>
			<Suspense fallback={<LikedVideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<LikedVideosSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
