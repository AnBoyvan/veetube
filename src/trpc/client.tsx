'use client';

import { useState } from 'react';

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import SuperJSON from 'superjson';

import { APP_URL } from '@/constants';

import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';

export const trpc = createTRPCReact<AppRouter>();

let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient();
	}
	return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
	const base = (() => {
		if (typeof window !== 'undefined') return '';
		return APP_URL;
	})();
	return `${base}/api/trpc`;
}
export function TRPCProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>,
) {
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					transformer: SuperJSON,
					url: getUrl(),
					async headers() {
						const headers = new Headers();
						headers.set('x-trpc-source', 'nextjs-react');
						return headers;
					},
				}),
			],
		}),
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}
