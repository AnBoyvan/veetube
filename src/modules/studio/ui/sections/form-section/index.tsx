'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { FormSectionSkeleton } from './form-section-skeleton';
import { FormSectionSuspense } from './form-section-suspense';

interface FormSectionProps {
	videoId: string;
}

export const FormSection = (props: FormSectionProps) => {
	return (
		<Suspense fallback={<FormSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<FormSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
