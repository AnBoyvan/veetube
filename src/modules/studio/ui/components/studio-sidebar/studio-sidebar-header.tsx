'use client';

import Link from 'next/link';

import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import {
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuSubItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export const StudioSidebarHeader = () => {
	const t = useTranslations();
	const { user } = useUser();
	const { state } = useSidebar();

	if (!user) {
		return (
			<SidebarHeader className="flex items-center justify-center pb-4">
				<Skeleton className="size-[112px] rounded-full" />
				<div className="flex flex-col items-center mt-2 gap-y-2">
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
		<SidebarHeader className="flex items-center justify-center pb-4">
			<Link prefetch href="/users/current">
				<UserAvatar
					imageUrl={user.imageUrl}
					name={user.fullName ?? 'User'}
					className="size-[112px] hover:opacity-80 transition-opacity"
				/>
			</Link>
			<div className="flex flex-col items-center mt-2 gap-y-1">
				<p className="text-sm font-medium">{t('user.your_profile')}</p>
				<p className="text-xs text-muted-foreground">{user.fullName}</p>
			</div>
		</SidebarHeader>
	);
};
