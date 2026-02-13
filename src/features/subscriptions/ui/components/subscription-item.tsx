import { useLocale, useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';
import { pluralize } from '@/i18n/pluralize';

import { useSubscription } from '../../hooks/use-subscription';
import { SubscriptionButton } from './subscription-button';

interface SubscriptionItemProps {
	name: string;
	imageUrl: string;
	subscriberCount: number;
	userId: string;
}

export const SubscriptionItem = ({
	name,
	imageUrl,
	subscriberCount,
	userId,
}: SubscriptionItemProps) => {
	const t = useTranslations();
	const locale = useLocale();

	const { onClick, isPending } = useSubscription({
		userId,
		isSubscribed: true,
	});

	return (
		<div className="flex items-center gap-4">
			<UserAvatar size="lg" name={name} imageUrl={imageUrl} />
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-sm">{name}</h3>
						<p className="text-muted-foreground text-xs">
							{Intl.NumberFormat(locale, {
								notation: 'compact',
							}).format(subscriberCount)}
							{t(pluralize(subscriberCount, 'subscribers'))}
						</p>
					</div>
					<SubscriptionButton
						size="sm"
						onClick={e => {
							e.preventDefault();
							onClick();
						}}
						disabled={isPending}
						isSubscribed
					/>
				</div>
			</div>
		</div>
	);
};

export const SubscriptionItemSkeleton = () => {
	return (
		<div className="flex items-start gap-4">
			<Skeleton className="size-10 rounded-full" />
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<div>
						<Skeleton className="h-4 w-24" />
						<Skeleton className="mt-1 h-3 w-20" />
					</div>
					<Skeleton className="h-8 w-20" />
				</div>
			</div>
		</div>
	);
};
