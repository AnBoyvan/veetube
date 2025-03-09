'use client';

import { useState } from 'react';

import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { PlaylistCreateModal } from '../components/playlist-create-modal';
import { PlaylistsSection } from '../sections/playlists-section';

export const PlaylistsView = () => {
	const t = useTranslations();

	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<PlaylistCreateModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold">{t('video.playlists_all')}</h1>
					<p className="text-xs text-muted-foreground">
						{t('video.playlists_created')}
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
			<PlaylistsSection />
		</div>
	);
};
