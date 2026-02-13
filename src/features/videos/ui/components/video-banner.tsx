import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { VideoGetOneOutput } from '../../types';

interface VideoBannerProps {
	status: VideoGetOneOutput['muxStatus'];
}

export const VideoBanner = ({ status }: VideoBannerProps) => {
	const t = useTranslations();

	if (status === 'ready') {
		return null;
	}

	return (
		<div className="flex items-center gap-2 rounded-b-xl bg-yellow-500 px-4 py-3 text-black">
			<AlertTriangleIcon className="size-4 shrink-0" />
			<p className="line-clamp-1 font-medium text-xs md:text-sm">
				{t('video.processed')}
			</p>
		</div>
	);
};
