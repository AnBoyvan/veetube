'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from 'next-themes';

import { ToastProvider } from '@/components/providers/toast-provider';
import { TRPCProvider } from '@/trpc/client';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TRPCProvider>
			<ThemeProvider
				attribute="class"
				storageKey="theme"
				enableSystem
				disableTransitionOnChange
			>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TRPCProvider>
	);
}
