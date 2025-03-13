import Image from 'next/image';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarHeader } from '@/components/ui/sidebar';

export const HomeSidebarHeader = () => {
	return (
		<SidebarHeader className="flex md:hidden flex-row items-center justify-between gap-x-4">
			<Link prefetch href="/">
				<div className="p-4 flex items-center gap-1">
					<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
					<p className="text-xl font-semibold font-amarante">VeeTube</p>
				</div>
			</Link>
			<div className="flex items-center gap-x-1">
				<LocaleSwitcher />
				<ThemeSwitcher />
			</div>
		</SidebarHeader>
	);
};
