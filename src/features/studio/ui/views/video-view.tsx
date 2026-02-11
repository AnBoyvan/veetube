'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import { FormSection, FormSectionSkeleton } from '../sections/form-section';

interface VideoViewProps {
	videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
	const t = useTranslations();

	return (
		<div className="max-w-screen-lg px-4 pt-2.5">
			<Suspense fallback={<FormSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_one_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<FormSection videoId={videoId} />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
