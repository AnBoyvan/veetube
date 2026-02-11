import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/features/auth/ui/components/auth-button';

import { StudioUploadModal } from './studio-upload-modal';

export const StudioNavbar = () => {
	const t = useTranslations();
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b bg-background px-2 pr-5 shadow-foreground/10 shadow-md">
			<div className="flex w-full items-center gap-4">
				<div className="flex flex-shrink-0 items-center">
					<SidebarTrigger />
					<Link prefetch href="/studio">
						<div className="flex items-center gap-1 p-4">
							<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
							<p className="font-semibold text-xl">{t('common.studio')}</p>
						</div>
					</Link>
				</div>
				<div className="flex-1" />
				<div className="flex flex-shrink-0 items-center gap-4">
					<StudioUploadModal />
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
