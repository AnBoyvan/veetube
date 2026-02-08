import type { Metadata } from 'next';
import { Amarante, Inter } from 'next/font/google';

import { enUS } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { cn } from '@/lib/utils/cn';

import favicon from '../../public/favicon.ico';
import openGraphImage from '../../public/opengraph-image.png';
import './globals.css';

import { ukUA } from '@/features/auth/localization/uk-UA';

import { Providers } from './providers';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
});

const amarante = Amarante({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-amarante',
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.BASE_URL || ''),
	icons: {
		icon: favicon.src,
	},
	title: {
		default: 'VeeTube',
		template: 'VeeTube',
	},
	description: '',
	twitter: {
		card: 'summary_large_image',
	},
	openGraph: {
		title: {
			default: 'VeeTube',
			template: 'VeeTube',
		},
		images: [
			{
				url: openGraphImage.src,
			},
		],
		description: '',
		type: 'website',
		url: process.env.BASE_URL || '',
		siteName: 'VeeTube',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<ClerkProvider
			localization={locale === 'uk' ? ukUA : enUS}
			afterSignOutUrl="/"
		>
			<html lang={locale} suppressHydrationWarning={true}>
				<body className={cn(inter.className, amarante.variable)}>
					<NextIntlClientProvider messages={messages}>
						<Providers>{children}</Providers>
					</NextIntlClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
