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
	description:
		'A modern, full-stack video sharing platform built with Next.js, featuring AI-powered content generation, real-time streaming, and community engagement capabilities.',

	keywords: [
		'Next.js video platform',
		'Full-stack TypeScript project',
		'tRPC video application',
		'Drizzle ORM PostgreSQL',
		'HLS video streaming platform',
		'Mux video integration',
		'AI metadata generation',
		'AI thumbnail generation',
		'Creator economy platform',
		'Scalable media platform architecture',
		'Video SaaS architecture',
		'App Router production architecture',
		'Type-safe backend system',
		'Video processing workflows',
		'Redis caching architecture',
		'Distributed rate limiting',
		'UGC platform architecture',
		'Portfolio full-stack project',
	],
	applicationName: 'VeeTube',
	creator: 'Andrii Boyvan',
	openGraph: {
		type: 'website',
		siteName: 'VeeTube',
		title: 'VeeTube',
		description:
			'A modern, full-stack video sharing platform built with Next.js, featuring AI-powered content generation, real-time streaming, and community engagement capabilities.',
		url: '/',
		images: [
			{
				url: ogImage.src,
				width: 1200,
				height: 630,
				alt: 'VeeTube',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: 'VeeTube',
		description:
			'A modern, full-stack video sharing platform built with Next.js, featuring AI-powered content generation, real-time streaming, and community engagement capabilities.',
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
