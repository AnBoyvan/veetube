import Link from 'next/link';

import { useAuth } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useSubscription } from '@/features/subscriptions/hooks/use-subscription';
import { SubscriptionButton } from '@/features/subscriptions/ui/components/subscription-button';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';
import { UserInfo } from '@/features/users/ui/components/user-info';
import type { VideoGetOneOutput } from '@/features/videos/types';
import { pluralize } from '@/i18n/pluralize';

interface VideoOwnerProps {
	user: VideoGetOneOutput['user'];
	videoId: string;
}

export const VideoOwner = ({ user, videoId }: VideoOwnerProps) => {
	const t = useTranslations();
	const { userId: clerkUserId, isLoaded } = useAuth();
	const { onClick, isPending } = useSubscription({
		userId: user.id,
		isSubscribed: user.viewerSubscribed,
		fromVideoId: videoId,
	});

	return (
		<div className="flex min-w-0 items-center justify-between gap-3 sm:items-start sm:justify-start">
			<Link href={`/users/${user.id}`}>
				<div className="flex min-w-0 items-center gap-3">
					<UserAvatar size="lg" imageUrl={user.imageUrl} name={user.name} />
					<div className="flex min-w-0 flex-col gap-1">
						<UserInfo size="lg" name={user.name} />
						<span className="line-clamp-1 text-muted-foreground text-sm">
							{user.subscriberCount}
							{t(pluralize(user.subscriberCount, 'subscribers'))}
						</span>
					</div>
				</div>
			</Link>
			{clerkUserId === user.clerkId ? (
				<Button variant="secondary" asChild className="rounded-full">
					<Link href={`/studio/videos/${videoId}`}>{t('video.edit')}</Link>
				</Button>
			) : (
				<SubscriptionButton
					onClick={onClick}
					disabled={isPending || !isLoaded}
					isSubscribed={user.viewerSubscribed}
					className="flex-none"
				/>
			)}
		</div>
	);
};
