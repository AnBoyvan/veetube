'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

interface FilterCarouselProps {
	value?: string | null;
	isLoading?: boolean;
	onSelect?: (value: string | null) => void;
	data?: {
		value: string;
		label: string;
	}[];
}

export const FilterCarousel = ({
	value,
	isLoading,
	onSelect,
	data,
}: FilterCarouselProps) => {
	const t = useTranslations();

	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="relative w-full">
			<div
				className={cn(
					'pointer-events-none absolute top-0 bottom-0 left-12 z-10 w-12 bg-gradient-to-r from-background to-transparent',
					current === 1 && 'hidden',
				)}
			/>
			<Carousel
				setApi={setApi}
				opts={{
					align: 'start',
					dragFree: true,
				}}
				className="w-full px-12"
			>
				<CarouselContent className="-ml-3">
					{isLoading &&
						Array.from({ length: 30 }).map((_, idx) => (
							<CarouselItem key={idx} className="basis-auto pl-3">
								<Skeleton className="h-full w-[100px] rounded-lg px-3 py-1 font-semibold text-sm">
									&nbsp;
								</Skeleton>
							</CarouselItem>
						))}
					{!isLoading && (
						<CarouselItem
							onClick={() => onSelect?.(null)}
							className="basis-auto pl-3"
						>
							<Badge
								variant={!value ? 'default' : 'secondary'}
								className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm"
							>
								{t('common.all')}
							</Badge>
						</CarouselItem>
					)}
					{!isLoading &&
						data &&
						data.map(item => (
							<CarouselItem
								key={item.value}
								onClick={() => onSelect?.(item.value)}
								className="basis-auto pl-3"
							>
								<Badge
									variant={value === item.value ? 'default' : 'secondary'}
									className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-sm"
								>
									{item.label}
								</Badge>
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious className="left-0 z-20" />
				<CarouselNext className="right-0 z-20" />
			</Carousel>
			<div
				className={cn(
					'pointer-events-none absolute top-0 right-12 bottom-0 z-10 w-12 bg-gradient-to-l from-background to-transparent',
					current === count && 'hidden',
				)}
			/>
		</div>
	);
};
