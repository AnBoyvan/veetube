'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ListIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSubscriptions } from '@/features/subscriptions/hooks/use-subscriptions';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';

import { LoadingSkeleton } from './loading-skeleton';

export const SubscriptionsSection = () => {
	const t = useTranslations();
	const pathname = usePathname();

	const { data, isLoading } = useSubscriptions();

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{t('common.subscriptions')}</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{isLoading && <LoadingSkeleton />}
					{!isLoading &&
						data?.pages
							.flatMap(page => page.items)
							.map(subscription => (
								<SidebarMenuItem
									key={`${subscription.creatorId}-${subscription.viewerId}`}
								>
									<SidebarMenuButton
										tooltip={subscription.user.name}
										asChild
										isActive={pathname === `/users/${subscription.user.id}`}
									>
										<Link
											prefetch
											href={`/users/${subscription.user.id}`}
											className="flex items-center gap-4"
										>
											<UserAvatar
												size="xs"
												imageUrl={subscription.user.imageUrl}
												name={subscription.user.name}
											/>
											<span className="text-sm">{subscription.user.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
					{!isLoading && (
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								isActive={pathname === '/subscriptions'}
							>
								<Link
									prefetch
									href="/subscriptions"
									className="flex items-center gap-4"
								>
									<ListIcon className="size-4" />
									<span className="text-sm">
										{t('common.subscriptions_all')}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
