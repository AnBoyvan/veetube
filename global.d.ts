import type { useTranslations } from 'next-intl';

import type { locales, messages } from '@/i18n/config';
import type { formats } from '@/i18n/request';

type Msgs = typeof messages;

type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
		: `${Key}`;
}[keyof ObjectType];

declare module 'next-intl' {
	interface AppConfig {
		Locale: (typeof locales)[number];
		Messages: typeof messages;
		Formats: typeof formats;
	}

	export type TranslationKey = NestedKeyOf<Msgs>;

	type ErrorMessage = {
		[key: string]: string | ErrorMessage;
	};

	type Translator = ReturnType<typeof useTranslations>;

	type TFunction = (
		key: TranslationKey,
		values?: Record<string, any>,
	) => string;
}
