import Image from 'next/image';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarHeader } from '@/components/ui/sidebar';

export const HomeSidebarHeader = () => {
	return (
		<SidebarHeader className="flex flex-row items-center justify-between gap-x-4 md:hidden">
			<Link prefetch href="/">
				<div className="flex items-center gap-1 p-4">
					<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
					<p className="font-amarante font-semibold text-xl">VeeTube</p>
				</div>
			</Link>
			<div className="flex items-center gap-x-1">
				<LocaleSwitcher />
				<ThemeSwitcher />
			</div>
		</SidebarHeader>
	);
};
