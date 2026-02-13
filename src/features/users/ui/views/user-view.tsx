'use client';

import { Suspense } from 'react';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';

import { UserSection, UserSectionSkeleton } from '../sections/user-section';
import {
	VideosSection,
	VideosSectionSkeleton,
} from '../sections/videos-section';

interface UserViewProps {
	userId: string;
}

export const UserView = ({ userId }: UserViewProps) => {
	const t = useTranslations();

	return (
		<div className="mx-auto mb-10 flex max-w-[1300px] flex-col gap-y-6 px-4 pt-2.5">
			<Suspense fallback={<UserSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('user.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<UserSection userId={userId} />
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
					<VideosSection userId={userId} />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
