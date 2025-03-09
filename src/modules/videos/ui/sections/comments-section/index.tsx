'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { CommentsSectionSkeleton } from './comments-section-skeleton';
import { CommentsSectionSuspense } from './comments-section-suspense';

interface CommentsSectionProps {
	videoId: string;
}

export const CommentsSection = (props: CommentsSectionProps) => {
	return (
		<Suspense fallback={<CommentsSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<CommentsSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
