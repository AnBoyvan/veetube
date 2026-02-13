import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { pluralize } from '@/i18n/pluralize';
import { cn } from '@/lib/utils/cn';

interface VideoDescriptionProps {
	viewCount: number;
	compactViews: string;
	expandedViews: string;
	compactDate: string;
	expandedDate: string;
	description?: string | null;
}

export const VideoDescription = ({
	viewCount,
	compactViews,
	expandedViews,
	compactDate,
	expandedDate,
	description,
}: VideoDescriptionProps) => {
	const t = useTranslations();

	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			onClick={() => setIsExpanded(prev => !prev)}
			className="cursor-pointer rounded-xl bg-secondary/50 p-3 transition hover:bg-secondary/70"
		>
			<div className="mb-2 flex gap-2 text-sm">
				<span className="font-medium">
					{isExpanded ? expandedViews : compactViews}
					{t(pluralize(viewCount, 'views'))}
				</span>
				<span className="font-medium">
					{isExpanded ? expandedDate : compactDate}
				</span>
			</div>
			<div className="relative">
				<p
					className={cn(
						'whitespace-pre-wrap text-sm',
						!isExpanded && 'line-clamp-2',
					)}
				>
					{description || t('common.no_description')}
				</p>
				<div className="mt-4 flex items-center gap-1 font-medium text-sm">
					{isExpanded ? (
						<>
							{t('actions.show_less')}
							<ChevronUpIcon className="ml-0.5 size-4" />
						</>
					) : (
						<>
							{t('actions.show_more')}
							<ChevronDownIcon className="ml-0.5 size-4" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
