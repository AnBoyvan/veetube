import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface VideoDescriptionProps {
	compactViews: string;
	expandedViews: string;
	compactDate: string;
	expandedDate: string;
	description?: string | null;
}

export const VideoDescription = ({
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
			className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition"
		>
			<div className="flex gap-2 text-sm mb-2">
				<span className="font-medium">
					{isExpanded ? expandedViews : compactViews}
					{t('common.views_pl')}
				</span>
				<span className="font-medium">
					{isExpanded ? expandedDate : compactDate}
				</span>
			</div>
			<div className="relative">
				<p
					className={cn(
						'text-sm whitespace-pre-wrap',
						!isExpanded && 'line-clamp-2',
					)}
				>
					{description || t('common.no_description')}
				</p>
				<div className="flex items-center gap-1 mt-4 text-sm font-medium">
					{isExpanded ? (
						<>
							{t('actions.show_less')}
							<ChevronUpIcon className="size-4 ml-0.5" />
						</>
					) : (
						<>
							{t('actions.show_more')}
							<ChevronDownIcon className="size-4 ml-0.5" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
