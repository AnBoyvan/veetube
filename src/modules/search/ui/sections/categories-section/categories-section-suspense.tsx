'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { FilterCarousel } from '@/components/common/filter-carousel';
import { getTranslated } from '@/i18n/get-translated';
import { trpc } from '@/trpc/client';

interface CategoriesSectionSuspenseProps {
	categoryId?: string;
}

export const CategoriesSectionSuspense = ({
	categoryId,
}: CategoriesSectionSuspenseProps) => {
	const t = useTranslations();
	const router = useRouter();

	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const data = categories.map(({ id, name }) => ({
		value: id,
		label: getTranslated(t, name),
	}));

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set('categoryId', value);
		} else {
			url.searchParams.delete('categoryId');
		}

		router.push(url.toString());
	};

	return <FilterCarousel value={categoryId} data={data} onSelect={onSelect} />;
};
