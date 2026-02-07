import { enUS, uk } from 'date-fns/locale';
import type { Locale } from 'next-intl';

import actions from '../../messages/en/actions.json';
import categories from '../../messages/en/categories.json';
import comment from '../../messages/en/comment.json';
import common from '../../messages/en/common.json';
import general from '../../messages/en/general.json';
import playlist from '../../messages/en/playlist.json';
import pluralize from '../../messages/en/pluralize.json';
import user from '../../messages/en/user.json';
import video from '../../messages/en/video.json';

export const messages = {
	...actions,
	...categories,
	...comment,
	...common,
	...general,
	...playlist,
	...pluralize,
	...user,
	...video,
};

export const locales = ['en', 'uk'] as const;

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const defaultLocale: Locale = 'en';

export const userLocale = {
	uk: uk,
	en: enUS,
};
