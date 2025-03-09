import { useTranslations } from 'next-intl';

import { VideosSection } from '../sections/videos-section';

export const StudioView = () => {
	const t = useTranslations();

	return (
		<div className="flex flex-col gap-y-6 pt-2.5">
			<div className="px-4">
				<h1 className="text-2xl font-bold">{t('common.channel_content')}</h1>
				<p className="text-xs text-muted-foreground">
					{t('video.manage_content')}
				</p>
			</div>
			<VideosSection />
		</div>
	);
};
