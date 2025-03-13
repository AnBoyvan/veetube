import { Loader2Icon, SparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AiGenerateButtonProps {
	isPending?: boolean;
	disabled?: boolean;
	onClick: () => void;
}

export const AiGenerateButton = ({
	disabled,
	isPending,
	onClick,
}: AiGenerateButtonProps) => {
	return (
		<Button
			type="button"
			size="icon"
			variant="outline"
			disabled={disabled || isPending}
			onClick={onClick}
			className="rounded-full size-6 [&_svg]:size-3"
		>
			{isPending ? <Loader2Icon className="animate-spin" /> : <SparklesIcon />}
		</Button>
	);
};
