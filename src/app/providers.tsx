'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from 'next-themes';

import { ToastProvider } from '@/components/providers/toast-provider';
import { TRPCReactProvider } from '@/trpc/client';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TRPCReactProvider>
			<ThemeProvider
				attribute="class"
				storageKey="theme"
				enableSystem
				disableTransitionOnChange
			>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TRPCReactProvider>
	);
}
