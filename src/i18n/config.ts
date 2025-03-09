import { enUS, uk } from 'date-fns/locale';

export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export const locales = ['en', 'uk'] as const;

export const defaultLocale: Locale = 'en';

export const userLocale = {
	uk: uk,
	en: enUS,
};
