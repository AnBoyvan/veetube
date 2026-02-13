import Image from 'next/image';
import Link from 'next/link';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/features/auth/ui/components/auth-button';

import { SearchInput } from './search-input';

export const HomeNavbar = () => {
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center bg-background px-2 pr-5">
			<div className="flex w-full items-center gap-4">
				<div className="flex flex-shrink-0 items-center">
					<SidebarTrigger />
					<Link href="/" className="hidden md:block">
						<div className="flex items-center gap-1 p-4">
							<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
							<p className="font-amarante font-semibold text-xl">VeeTube</p>
						</div>
					</Link>
				</div>
				<div className="mx-auto flex max-w-[720px] flex-1 justify-center">
					<SearchInput />
				</div>
				<div className="flex flex-shrink-0 items-center gap-4">
					<div className="hidden items-center gap-x-1 md:flex">
						<LocaleSwitcher />
						<ThemeSwitcher />
					</div>
					<AuthButton />
				</div>
			</div>
		</nav>
	);
};
