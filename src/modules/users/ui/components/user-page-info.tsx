import Link from 'next/link';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import { Button } from '@/components/ui/button';
import { pluralize } from '@/i18n/pluralize';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/modules/subscriptions/hooks/use-subscription';
import { SubscriptionButton } from '@/modules/subscriptions/ui/components/subscription-button';

import { UsersGetOneOutput } from '../../types';

interface UserPageInfoProps {
	user: UsersGetOneOutput;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
	const t = useTranslations();
	const { userId: clerkUserId, isLoaded } = useAuth();
	const clerk = useClerk();
	const { isPending, onClick } = useSubscription({
		userId: user.id,
		isSubscribed: user.viewerSubscribed,
	});

	return (
		<div className="py-6">
			<div className="flex flex-col md:hidden">
				<div className="flex items-center gap-3">
					<UserAvatar
						size="lg"
						imageUrl={user.imageUrl}
						name={user.name}
						className="h-[60px] w-[60px]"
						onClick={() => {
							if (user.clerkId === clerkUserId) {
								clerk.openUserProfile();
							}
						}}
					/>
					<div className="flex-1 min-w-0">
						<h1 className="text-xl font-bold">{user.name}</h1>
						<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<span>
								{user.subscriberCount}
								{t(pluralize(user.subscriberCount, 'subscribers'))}
							</span>
							<span>&bull;</span>
							<span>
								{user.videoCount}
								{t(pluralize(user.videoCount, 'videos'))}
							</span>
						</div>
					</div>
				</div>
				{user.clerkId === clerkUserId ? (
					<Button
						variant="secondary"
						asChild
						className="w-full mt-3 rounded-full"
					>
						<Link prefetch href="/studio">
							{t('actions.go_studio')}
						</Link>
					</Button>
				) : (
					<SubscriptionButton
						onClick={onClick}
						isSubscribed={user.viewerSubscribed}
						disabled={isPending || !isLoaded}
						className="w-full mt-3"
					/>
				)}
			</div>
			<div className="hidden md:flex items-start gap-4">
				<UserAvatar
					size="xl"
					imageUrl={user.imageUrl}
					name={user.name}
					className={cn(
						user.clerkId === clerkUserId &&
							'cursor-pointer hover:opacity-80 transition-opacity',
					)}
					onClick={() => {
						if (user.clerkId === clerkUserId) {
							clerk.openUserProfile();
						}
					}}
				/>
				<div className="flex-1 min-w-0">
					<h1 className="text-4xl font-bold">{user.name}</h1>
					<div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
						<span>
							{user.subscriberCount}
							{t(pluralize(user.subscriberCount, 'subscribers'))}
						</span>
						<span>&bull;</span>
						<span>
							{user.videoCount}
							{t(pluralize(user.videoCount, 'videos'))}
						</span>
					</div>
					{user.clerkId === clerkUserId ? (
						<Button variant="secondary" asChild className="mt-3 rounded-full">
							<Link prefetch href="/studio">
								{t('actions.go_studio')}
							</Link>
						</Button>
					) : (
						<SubscriptionButton
							onClick={onClick}
							isSubscribed={user.viewerSubscribed}
							disabled={isPending || !isLoaded}
							className="mt-3"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
