'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth, useClerk } from '@clerk/nextjs';
import {
	FlameIcon,
	HomeIcon,
	type LucideIcon,
	PlaySquareIcon,
} from 'lucide-react';
import { type TranslationKey, useTranslations } from 'next-intl';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

type MainSectionItem = {
	title: TranslationKey;
	url: string;
	icon: LucideIcon;
	auth?: boolean;
};

const mainSectionConfig: MainSectionItem[] = [
	{
		title: 'common.home',
		url: '/',
		icon: HomeIcon,
	},
	{
		title: 'common.subscriptions',
		url: '/feed/subscriptions',
		icon: PlaySquareIcon,
		auth: true,
	},
	{
		title: 'common.trending',
		url: '/feed/trending',
		icon: FlameIcon,
	},
];

export const MainSection = () => {
	const t = useTranslations();
	const clerk = useClerk();
	const { isSignedIn } = useAuth();
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{mainSectionConfig.map(item => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={t(item.title)}
								asChild
								isActive={pathname === item.url}
								onClick={e => {
									if (!isSignedIn && item.auth) {
										e.preventDefault();
										return clerk.openSignIn();
									}
								}}
							>
								<Link
									prefetch
									href={item.url}
									className="flex items-center gap-4"
								>
									<item.icon />
									<span className="text-sm">{t(item.title)}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
