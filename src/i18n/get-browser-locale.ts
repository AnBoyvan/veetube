import { headers } from 'next/headers';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { Locale, defaultLocale, locales } from '@/i18n/config';

export async function getBrowserLocale(): Promise<Locale> {
	const reqHeaders = await headers();
	const negotiatorHeaders = {
		'accept-language': reqHeaders.get('accept-language') || 'en-US,en;q=0.5',
	};

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = match(languages, locales, defaultLocale) as Locale;

	return locale;
}
