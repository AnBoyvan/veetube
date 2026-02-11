'use client';

import Link from 'next/link';

import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { ThemeSwitcher } from '@/components/common/theme-switcher';
import {
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';

export const StudioSidebarHeader = () => {
	const t = useTranslations();
	const { user } = useUser();
	const { state } = useSidebar();

	if (!user) {
		return (
			<SidebarHeader className="flex items-center justify-center pb-4">
				<Skeleton className="size-[112px] rounded-full" />
				<div className="mt-2 flex flex-col items-center gap-y-2">
					<Skeleton className="h-4 w-[80px]" />
					<Skeleton className="h-4 w-[100px]" />
				</div>
			</SidebarHeader>
		);
	}

	if (state === 'collapsed') {
		return (
			<SidebarMenuSubItem>
				<SidebarMenuButton tooltip={t('user.your_profile')} asChild>
					<Link
						prefetch
						href="/users/current"
						className="flex items-center gap-4"
					>
						<UserAvatar
							imageUrl={user.imageUrl}
							name={user.fullName ?? 'User'}
							size="xs"
						/>
						<span className="text-xs">{t('user.your_profile')}</span>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuSubItem>
		);
	}

	return (
		<SidebarHeader className="relative flex items-center justify-center pb-4">
			<Link prefetch href="/users/current">
				<UserAvatar
					imageUrl={user.imageUrl}
					name={user.fullName ?? 'User'}
					className="size-[112px] transition-opacity hover:opacity-80"
				/>
			</Link>
			<div className="mt-2 flex flex-col items-center gap-y-1">
				<p className="font-medium text-sm">{t('user.your_profile')}</p>
				<p className="text-muted-foreground text-xs">{user.fullName}</p>
			</div>
			<div className="absolute top-1 left-1 md:hidden">
				<LocaleSwitcher />
			</div>
			<div className="absolute top-1 right-1 md:hidden">
				<ThemeSwitcher />
			</div>
		</SidebarHeader>
	);
};
