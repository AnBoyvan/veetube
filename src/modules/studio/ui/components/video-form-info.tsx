import Link from 'next/link';
import { useState } from 'react';

import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { APP_URL } from '@/constants';
import { VideoPlayer } from '@/modules/videos/ui/components/video-player';

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
		<div className="flex flex-col gap-4 bg-border rounded-xl overflow-hidden h-fit">
			<div className="aspect-video overflow-hidden relative">
				<VideoPlayer playbackId={muxPlaybackId} thumbnailUrl={thumbnailUrl} />
			</div>
			<div className="p-4 flex flex-col gap-y-6">
				<div className="flex items-center justify-between gap-x-2">
					<div className="flex flex-col gap-y-1 w-full">
						<p className="text-xs text-muted-foreground">{t('video.link')}</p>
						<div className="flex items-center gap-x-2 w-full">
							<Link
								prefetch
								href={`/videos/${videoId}`}
								className="overflow-hidden"
							>
								<p className="line-clamp-1 text-sm text-focus">{fullUrl}</p>
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
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-y-1">
						<p className="text-xs text-muted-foreground">{t('video.status')}</p>
						<p className="text-sm">
							{t(
								`video.statuses.${muxStatus ?? 'preparing'}` as TranslationKey,
							)}
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-y-1">
						<p className="text-xs text-muted-foreground">
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
