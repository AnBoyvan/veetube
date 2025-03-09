'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { APP_URL } from '@/constants';

export const SearchInput = () => {
	const t = useTranslations();
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get('query') || '';
	const categoryId = searchParams.get('categoryId') || '';

	const [value, setValue] = useState(query);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const url = new URL('/search', APP_URL);
		const newQuery = value.trim();

		url.searchParams.set('query', encodeURIComponent(newQuery));

		if (categoryId) {
			url.searchParams.set('categoryId', categoryId);
		}

		if (newQuery === '') {
			url.searchParams.delete('query');
		}

		setValue(newQuery);
		router.push(url.toString());
	};

	return (
		<form onSubmit={handleSearch} className="flex w-full max-w-[600px]">
			<div className="relative w-full">
				<input
					type="search"
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder={t('common.search')}
					className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-focus"
				/>
				{!!value && (
					<Button
						type="button"
						size="icon"
						variant="ghost"
						onClick={() => setValue('')}
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-gray-500"
					>
						<XIcon />
					</Button>
				)}
			</div>
			<button
				type="submit"
				disabled={!value.trim()}
				className="px-5 py-2.5 bg-secondary text-secondary-foreground border border-l-0 rounded-r-full hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
			>
				<SearchIcon className="size-5" />
			</button>
		</form>
	);
};
