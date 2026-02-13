'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth, useClerk } from '@clerk/nextjs';
import {
	HistoryIcon,
	ListVideoIcon,
	type LucideIcon,
	ThumbsUpIcon,
} from 'lucide-react';
import { type TranslationKey, useTranslations } from 'next-intl';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

type PersonalSectionItem = {
	title: TranslationKey;
	url: string;
	icon: LucideIcon;
	auth?: boolean;
};

export const personalSectionConfig: PersonalSectionItem[] = [
	{
		title: 'common.history',
		url: '/playlists/history',
		icon: HistoryIcon,
		auth: true,
	},
	{
		title: 'video.liked',
		url: '/playlists/liked',
		icon: ThumbsUpIcon,
		auth: true,
	},
	{
		title: 'playlist.all',
		url: '/playlists',
		icon: ListVideoIcon,
		auth: true,
	},
];

export const PersonalSection = () => {
	const t = useTranslations();
	const clerk = useClerk();
	const { isSignedIn } = useAuth();
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t('common.you')}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{personalSectionConfig.map(item => (
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
								<Link href={item.url} className="flex items-center gap-4">
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
