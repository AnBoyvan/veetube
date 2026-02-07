import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './user-locale';

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: {
			...(await import(`../../messages/${locale}/actions.json`)).default,
			...(await import(`../../messages/${locale}/categories.json`)).default,
			...(await import(`../../messages/${locale}/comment.json`)).default,
			...(await import(`../../messages/${locale}/common.json`)).default,
			...(await import(`../../messages/${locale}/general.json`)).default,
			...(await import(`../../messages/${locale}/playlist.json`)).default,
			...(await import(`../../messages/${locale}/pluralize.json`)).default,
			...(await import(`../../messages/${locale}/user.json`)).default,
			...(await import(`../../messages/${locale}/video.json`)).default,
		},
	};
});
