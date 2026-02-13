'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	PlaylistHeaderSection,
	PlaylistHeaderSectionSkeleton,
} from '../sections/playlist-header-section';
import {
	VideosSection,
	VideosSectionSkeleton,
} from '../sections/videos-section';

interface PlaylistVideosViewProps {
	playlistId: string;
}

export const PlaylistVideosView = ({ playlistId }: PlaylistVideosViewProps) => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-y-6 px-4 pt-2.5">
			<Suspense fallback={<PlaylistHeaderSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('playlist.load_one_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<PlaylistHeaderSection playlistId={playlistId} />
				</ErrorBoundary>
			</Suspense>
			<Suspense fallback={<VideosSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('video.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<VideosSection playlistId={playlistId} />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
