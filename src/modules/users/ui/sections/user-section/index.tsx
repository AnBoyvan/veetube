'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { UserSectionSkeleton } from './user-section-skeleton';
import { UserSectionSuspense } from './user-section-suspense';

interface UserSectionProps {
	userId: string;
}

export const UserSection = (props: UserSectionProps) => {
	return (
		<Suspense fallback={<UserSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<UserSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};
