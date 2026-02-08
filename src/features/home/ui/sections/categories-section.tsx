import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { FilterCarousel } from '@/components/common/filter-carousel';
import { useCategories } from '@/features/categories/hooks/use-categories';
import { getTranslated } from '@/i18n/get-translated';

interface CategoriesSectionProps {
	categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
	const t = useTranslations();
	const router = useRouter();

	const { data } = useCategories();

	const categories = data.map(({ id, name }) => ({
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

	return (
		<FilterCarousel value={categoryId} data={categories} onSelect={onSelect} />
	);
};

export const CategoriesSectionSkeleton = () => {
	return <FilterCarousel isLoading />;
};
