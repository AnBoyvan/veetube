'use server';

import { headers } from 'next/headers';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { Locale } from 'next-intl';

import { defaultLocale, locales } from '@/i18n/config';

function sanitizeLanguages(languages: string[]): string[] {
	return languages
		.map(l => l.trim())
		.filter(l => {
			if (!l || l === '*') return false;
			try {
				Intl.getCanonicalLocales(l);
				return true;
			} catch {
				return false;
			}
		});
}

export async function getBrowserLocale(): Promise<Locale> {
	const reqHeaders = await headers();
	const negotiatorHeaders = {
		'accept-language': reqHeaders.get('accept-language') || 'en-US,en;q=0.5',
	};

	const rawLanguages = new Negotiator({
		headers: negotiatorHeaders,
	}).languages();

	const languages = sanitizeLanguages(rawLanguages);

	if (languages.length === 0) {
		return defaultLocale;
	}

	const locale = match(languages, locales, defaultLocale) as Locale;

	return locale;
}
