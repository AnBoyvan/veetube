import { useTranslations } from 'next-intl';

import { LikedVideosSection } from '../sections/liked-videos-section';

export const LikedView = () => {
	const t = useTranslations();

	return (
		<div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<h1 className="text-2xl font-bold">{t('video.liked')}</h1>
			<LikedVideosSection />
		</div>
	);
};
