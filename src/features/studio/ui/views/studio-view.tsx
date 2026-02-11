'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	VideosSection,
	VideosSectionSkeleton,
} from '../sections/videos-section';

export const StudioView = () => {
	const t = useTranslations();

	return (
		<div className="flex flex-col gap-y-6 pt-2.5">
			<div className="px-4">
				<h1 className="font-bold text-2xl">{t('common.channel_content')}</h1>
				<p className="text-muted-foreground text-xs">
					{t('user.manage_content')}
				</p>
			</div>
			<Suspense fallback={<VideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<VideosSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
