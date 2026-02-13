import Link from 'next/link';

import { useAuth, useClerk } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubscription } from '@/features/subscriptions/hooks/use-subscription';
import { SubscriptionButton } from '@/features/subscriptions/ui/components/subscription-button';
import { pluralize } from '@/i18n/pluralize';
import { cn } from '@/lib/utils/cn';

import type { UsersGetOneOutput } from '../../types';
import { UserAvatar } from './user-avatar';

interface UserPageInfoProps {
	user: UsersGetOneOutput;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
	const t = useTranslations();
	const clerk = useClerk();
	const { userId: clerkUserId, isLoaded } = useAuth();

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
					<div className="min-w-0 flex-1">
						<h1 className="font-bold text-xl">{user.name}</h1>
						<div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
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
						className="mt-3 w-full rounded-full"
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
						className="mt-3 w-full"
					/>
				)}
			</div>
			<div className="hidden items-start gap-4 md:flex">
				<UserAvatar
					size="xl"
					imageUrl={user.imageUrl}
					name={user.name}
					className={cn(
						user.clerkId === clerkUserId &&
							'cursor-pointer transition-opacity hover:opacity-80',
					)}
					onClick={() => {
						if (user.clerkId === clerkUserId) {
							clerk.openUserProfile();
						}
					}}
				/>
				<div className="min-w-0 flex-1">
					<h1 className="font-bold text-4xl">{user.name}</h1>
					<div className="mt-3 flex items-center gap-1 text-muted-foreground text-sm">
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

export const UserPageInfoSkeleton = () => {
	return (
		<div className="py-6">
			<div className="flex flex-col md:hidden">
				<div className="flex items-center gap-3">
					<Skeleton className="h-[60px] w-[60px] rounded-full" />
					<div className="min-w-0 flex-1">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="mt-1 h-4 w-48" />
					</div>
				</div>
				<Skeleton className="mt-3 h-8 w-full rounded-full" />
			</div>
			<div className="hidden items-start gap-4 md:flex">
				<Skeleton className="h-[160px] w-[160px] rounded-full" />
				<div className="min-w-0 flex-1">
					<Skeleton className="h-8 w-64" />
					<Skeleton className="mt-4 h-5 w-48" />
					<Skeleton className="mt-3 h-8 w-32 rounded-full" />
				</div>
			</div>
		</div>
	);
};
