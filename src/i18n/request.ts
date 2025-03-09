import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './userLocale';

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: {
			...(await import(`../../messages/${locale}/actions.json`)).default,
			...(await import(`../../messages/${locale}/auth.json`)).default,
			...(await import(`../../messages/${locale}/categories.json`)).default,
			...(await import(`../../messages/${locale}/common.json`)).default,
			...(await import(`../../messages/${locale}/general.json`)).default,
			...(await import(`../../messages/${locale}/user.json`)).default,
			...(await import(`../../messages/${locale}/validation.json`)).default,
			...(await import(`../../messages/${locale}/video.json`)).default,
		},
	};
});
