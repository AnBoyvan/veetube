import { useTranslations } from 'next-intl';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubscriptionButtonProps {
	onClick: ButtonProps['onClick'];
	disabled: boolean;
	isSubscribed: boolean;
	className?: string;
	size?: ButtonProps['size'];
}

export const SubscriptionButton = ({
	onClick,
	disabled,
	isSubscribed,
	className,
	size,
}: SubscriptionButtonProps) => {
	const t = useTranslations();

	return (
		<Button
			size={size}
			variant={isSubscribed ? 'secondary' : 'default'}
			disabled={disabled}
			className={cn('rounded-full', className)}
			onClick={onClick}
		>
			{isSubscribed ? t('actions.unsubscribe') : t('actions.subscribe')}
		</Button>
	);
};
