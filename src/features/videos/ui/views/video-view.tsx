'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import {
	CommentsSection,
	CommentsSectionSkeleton,
} from '../sections/comments-section';
import {
	SuggestionsSection,
	SuggestionsSectionSkeleton,
} from '../sections/suggestions-section';
import { VideoSection, VideoSectionSkeleton } from '../sections/video-section';

interface VideoViewProps {
	videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-[1700px] flex-col px-4 pt-2.5">
			<div className="flex flex-col gap-6 xl:flex-row">
				<div className="min-w-0 flex-1">
					<Suspense fallback={<VideoSectionSkeleton />}>
						<ErrorBoundary
							fallback={
								<ErrorState
									title={t('video.load_one_error')}
									description={t('general.try_later')}
								/>
							}
						>
							<VideoSection videoId={videoId} />
						</ErrorBoundary>
					</Suspense>
					<div className="mt-4 block xl:hidden">
						<Suspense fallback={<SuggestionsSectionSkeleton />}>
							<ErrorBoundary
								fallback={
									<ErrorState
										title={t('video.load_error')}
										description={t('general.try_later')}
									/>
								}
							>
								<SuggestionsSection videoId={videoId} isManual />
							</ErrorBoundary>
						</Suspense>
					</div>
					<Suspense fallback={<CommentsSectionSkeleton />}>
						<ErrorBoundary
							fallback={
								<ErrorState
									title={t('comment.load_error')}
									description={t('general.try_later')}
								/>
							}
						>
							<CommentsSection videoId={videoId} />
						</ErrorBoundary>
					</Suspense>
				</div>
				<div className="hidden w-full shrink-1 xl:block xl:w-[380px] 2xl:w-[460px]">
					<Suspense fallback={<div />}>
						<ErrorBoundary
							fallback={
								<ErrorState
									title={t('video.load_error')}
									description={t('general.try_later')}
								/>
							}
						>
							<SuggestionsSection videoId={videoId} isManual />
						</ErrorBoundary>
					</Suspense>
				</div>
			</div>
		</div>
	);
};
