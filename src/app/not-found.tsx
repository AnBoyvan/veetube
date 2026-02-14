'use client';

import Link from 'next/link';

import { FrownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function ErrorPage() {
	const t = useTranslations();

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-y-4">
			<FrownIcon className="size-40 text-muted-foreground" />
			<p className="font-bold text-4xl text-muted-foreground">404</p>
			<p className="font-medium text-base text-muted-foreground">
				{t('general.page_not_found')}
			</p>
			<Button size="sm" asChild>
				<Link prefetch href="/">
					{t('actions.back_home')}
				</Link>
			</Button>
		</div>
	);
}
