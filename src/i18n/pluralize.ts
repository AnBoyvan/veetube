import type { TranslationKey } from 'next-intl';

type Entity =
	| 'comments'
	| 'likes'
	| 'replies'
	| 'subscribers'
	| 'videos'
	| 'views';

type Pluralize = (count: number, entity: Entity) => TranslationKey;

export const pluralize: Pluralize = (count, entity) => {
	if (count % 10 === 1 && count % 100 !== 11) {
		return `pluralize.${entity}.one`;
	}

	if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
		return `pluralize.${entity}.few`;
	}

	return `pluralize.${entity}.many`;
};
