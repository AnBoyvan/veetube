import { useLocale, useTranslations } from 'next-intl';

import { UserAvatar } from '@/components/common/user-avatar';
import { pluralize } from '@/i18n/pluralize';

import { SubscriptionButton } from './subscription-button';

interface SubscriptionItemProps {
	name: string;
	imageUrl: string;
	subscriberCount: number;
	onUnsubscride: () => void;
	disabled: boolean;
}

export const SubscriptionItem = ({
	name,
	imageUrl,
	subscriberCount,
	onUnsubscride,
	disabled,
}: SubscriptionItemProps) => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className="flex items-center gap-4">
			<UserAvatar size="lg" name={name} imageUrl={imageUrl} />
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-sm">{name}</h3>
						<p className="text-xs text-muted-foreground">
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
							onUnsubscride();
						}}
						disabled={disabled}
						isSubscribed
					/>
				</div>
			</div>
		</div>
	);
};
