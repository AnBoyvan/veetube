import type { TFunction } from 'next-intl';

import { getMessageKey } from './get-message-key';

export const getTranslated = (t: TFunction, str: string): string => {
	const key = getMessageKey(str);

	return key ? t(key) : str;
};
