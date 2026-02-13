'use client';

import { Suspense, useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorState } from '@/components/common/error-state';
import { Button } from '@/components/ui/button';

import { PlaylistCreateModal } from '../components/playlist-create-modal';
import {
	PlaylistsSection,
	PlaylistsSectionSkeleton,
} from '../sections/playlists-section';

export const PlaylistsView = () => {
	const t = useTranslations();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	return (
		<div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
			<PlaylistCreateModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-2xl">{t('playlist.all')}</h1>
					<p className="text-muted-foreground text-xs">
						{t('playlist.page_description')}
					</p>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setIsCreateModalOpen(true)}
					className="rounded-full"
				>
					<PlusIcon />
				</Button>
			</div>
			<Suspense fallback={<PlaylistsSectionSkeleton />}>
				<ErrorBoundary
					fallback={
						<ErrorState
							title={t('playlist.load_error')}
							description={t('general.try_later')}
						/>
					}
				>
					<PlaylistsSection />
				</ErrorBoundary>
			</Suspense>
		</div>
	);
};
