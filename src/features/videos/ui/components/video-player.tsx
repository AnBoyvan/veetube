'use client';

import MuxPlayer from '@mux/mux-player-react';

import { THUMBNAIL_FALLBACK } from '@/lib/constants';

interface VideoPlayerProps {
	playbackId?: string | null | undefined;
	thumbnailUrl?: string | null | undefined;
	autoPlay?: boolean;
	onPlay?: () => void;
}

export const VideoPlayer = ({
	playbackId,
	thumbnailUrl,
	autoPlay,
	onPlay,
}: VideoPlayerProps) => {
	return (
		<MuxPlayer
			playbackId={playbackId || ''}
			poster={thumbnailUrl || THUMBNAIL_FALLBACK}
			playerInitTime={0}
			autoPlay={autoPlay}
			thumbnailTime={0}
			className="h-full w-full object-cover"
			accentColor="#EC003F"
			onPlay={onPlay}
		/>
	);
};

export const VideoPlayerSkeleton = () => {
	return <div className="aspect-video rounded-xl bg-black" />;
};
