'use client';

import Link from 'next/link';

import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { getMessageKey } from '@/i18n/get-message-key';

export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string };
}) {
	const t = useTranslations();

	const tKey = getMessageKey(error.message);

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-y-4">
			<AlertTriangleIcon className="mb-2 size-6 text-muted-foreground" />
			<p className="font-medium text-muted-foreground text-sm">
				{tKey ? t(tKey) : error.message}
			</p>
			<Button size="sm" asChild>
				<Link prefetch href="/">
					{t('actions.back_home')}
				</Link>
			</Button>
		</div>
	);
}
