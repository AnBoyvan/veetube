import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { VideoGetOneOutput } from '../../types';

interface VideoBannerProps {
	status: VideoGetOneOutput['muxStatus'];
}

export const VideoBanner = ({ status }: VideoBannerProps) => {
	const t = useTranslations();

	if (status === 'ready') {
		return null;
	}

	return (
		<div className="bg-yellow-500 text-black py-3 px-4 rounded-b-xl flex items-center gap-2">
			<AlertTriangleIcon className="size-4 shrink-0" />
			<p className="text-xs md:text-sm font-medium line-clamp-1">
				{t('video.processed')}
			</p>
		</div>
	);
};
