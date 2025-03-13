'use client';

import { useTheme } from 'next-themes';
import { Toaster, ToasterProps } from 'sonner';

export function ToastProvider() {
	const { resolvedTheme } = useTheme();

	return (
		<>
			<Toaster theme={resolvedTheme as ToasterProps['theme']} richColors />
		</>
	);
}
