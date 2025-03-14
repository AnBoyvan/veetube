import Image from 'next/image';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/modules/auth/ui/components/auth-button';

import { SearchInput } from './search-input';

export const HomeNavbar = () => {
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50">
			<div className="flex items-center gap-4 w-full">
				<div className="flex items-center flex-shrink-0">
					<SidebarTrigger />
					<Link prefetch href="/" className="hidden md:block">
						<div className="p-4 flex items-center gap-1">
							<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
							<p className="text-xl font-semibold font-amarante">VeeTube</p>
						</div>
					</Link>
				</div>
				<div className="flex-1 flex justify-center max-w-[720px] mx-auto">
					<SearchInput />
				</div>
				<div className="flex-shrink-0 flex items-center gap-4">
					<div className="hidden md:flex items-center gap-x-1">
						<LocaleSwitcher />
						<ThemeSwitcher />
					</div>
					<AuthButton />
				</div>
			</div>
		</nav>
	);
};
