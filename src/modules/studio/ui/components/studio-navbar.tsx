import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/modules/auth/ui/components/auth-button';

import { StudioUploadModal } from './studio-upload-modal';

export const StudioNavbar = () => {
	const t = useTranslations();
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b shadow-md shadow-foreground/10">
			<div className="flex items-center gap-4 w-full">
				<div className="flex items-center flex-shrink-0">
					<SidebarTrigger />
					<Link prefetch href="/studio">
						<div className="p-4 flex items-center gap-1">
							<Image src="/logo.svg" width={24} height={24} alt={'Logo'} />
							<p className="text-xl font-semibold">{t('common.studio')}</p>
						</div>
					</Link>
				</div>
				<div className="flex-1" />
				<div className="flex-shrink-0 flex items-center gap-4">
					<StudioUploadModal />
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
