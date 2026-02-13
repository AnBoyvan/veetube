import Link from 'next/link';
import { useState } from 'react';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { type TranslationKey, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoPlayer } from '@/features/videos/ui/components/video-player';
import { APP_URL } from '@/lib/constants';

interface VideoFormInfoProps {
	videoId: string;
	muxPlaybackId: string | null;
	thumbnailUrl: string | null;
	muxStatus: string | null;
	muxTrackStatus: string | null;
}

export const VideoFormInfo = ({
	videoId,
	muxPlaybackId,
	thumbnailUrl,
	muxStatus,
	muxTrackStatus,
}: VideoFormInfoProps) => {
	const t = useTranslations();

	const [isCopied, setIsCopied] = useState(false);

	const fullUrl = `${APP_URL}/videos/${videoId}`;

	const onCopy = async () => {
		await navigator.clipboard.writeText(fullUrl);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<div className="flex h-fit flex-col gap-4 overflow-hidden rounded-xl bg-muted">
			<div className="relative aspect-video overflow-hidden">
				<VideoPlayer playbackId={muxPlaybackId} thumbnailUrl={thumbnailUrl} />
			</div>
			<div className="flex flex-col gap-y-6 p-4">
				<div className="flex items-center justify-between gap-x-2">
					<div className="flex w-full flex-col gap-y-1">
						<p className="text-muted-foreground text-xs">{t('video.link')}</p>
						<div className="flex w-full items-center gap-x-2">
							<Link href={`/videos/${videoId}`} className="overflow-hidden">
								<p className="line-clamp-1 text-focus text-sm">{fullUrl}</p>
							</Link>
							<Button
								type="button"
								size="icon"
								variant="ghost"
								disabled={isCopied}
								onClick={onCopy}
								className="shrink-0"
							>
								{isCopied ? <CopyCheckIcon /> : <CopyIcon />}
							</Button>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<p className="text-muted-foreground text-xs">{t('video.status')}</p>
						<p className="text-sm">
							{t(
								`video.statuses.${muxStatus ?? 'preparing'}` as TranslationKey,
							)}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<p className="text-muted-foreground text-xs">
							{t('video.subtitles_status')}
						</p>
						<p className="text-sm">
							{t(
								`video.statuses.${muxTrackStatus ?? 'none'}` as TranslationKey,
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const VideoFormInfoSkeleton = () => {
	return (
		<div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-border">
			<Skeleton className="aspect-video" />
			<div className="space-y-6 p-4">
				<div className="space-y-3">
					<Skeleton className="h-3 w-20" />
					<Skeleton className="h-5 w-full" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-3.5 w-24" />
					<Skeleton className="h-5 w-32" />
				</div>
				<div className="space-y-3">
					<Skeleton className="h-3.5 w-24" />
					<Skeleton className="h-5 w-32" />
				</div>
			</div>
		</div>
	);
};
