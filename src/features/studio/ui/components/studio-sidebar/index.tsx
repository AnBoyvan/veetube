'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogOutIcon, VideoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

import { StudioSidebarHeader } from './studio-sidebar-header';

export const StudioSidebar = () => {
	const t = useTranslations();
	const pathname = usePathname();

	return (
		<Sidebar className="z-40 pt-16" collapsible="icon">
			<SidebarContent className="bg-background">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<StudioSidebarHeader />
							<SidebarMenuItem>
								<SidebarMenuButton
									tooltip={t('common.content')}
									asChild
									isActive={pathname === '/studio'}
								>
									<Link href="/studio" className="flex items-center gap-4">
										<VideoIcon />
										<span className="text-sm">{t('common.content')}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<Separator />
							<SidebarMenuItem>
								<SidebarMenuButton tooltip={t('actions.exit_studio')} asChild>
									<Link href="/" className="flex items-center gap-4">
										<LogOutIcon />
										<span className="text-sm">{t('actions.exit_studio')}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
