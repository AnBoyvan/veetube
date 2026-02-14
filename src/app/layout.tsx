import type { Metadata } from 'next';
import { Amarante, Inter } from 'next/font/google';

import { enUS } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { cn } from '@/lib/utils/cn';

import favicon from '../../public/favicon.ico';
import ogImage from '../../public/opengraph-image.png';
import twitterImage from '../../public/twitter-image.png';
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
		template: '%s · VeeTube',
	},
	description: '', //TODO:

	keywords: [], //TODO:
	applicationName: 'VeeTube',
	creator: 'Andrii Boyvan',
	openGraph: {
		type: 'website',
		siteName: 'VeeTube',
		title: '', //TODO:
		description: '',
		url: '/',
		images: [
			{
				url: ogImage.src,
				width: 1200,
				height: 630,
				alt: '', //TODO:
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: '', //TODO:
		description: '', //TODO:
		images: [twitterImage.src],
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},

	category: 'entertainment',
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
