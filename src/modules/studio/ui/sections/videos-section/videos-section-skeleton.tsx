import { useTranslations } from 'next-intl';

import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';

export const VideosSectionSkeleton = () => {
	const t = useTranslations();

	return (
		<>
			<div className="border-y">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6 w-[510px]">
								{t('common.video')}
							</TableHead>
							<TableHead>{t('common.visibility')}</TableHead>
							<TableHead>{t('common.status')}</TableHead>
							<TableHead>{t('common.date')}</TableHead>
							<TableHead className="text-right">{t('common.views')}</TableHead>
							<TableHead className="text-right">
								{t('common.comments')}
							</TableHead>
							<TableHead className="text-right pr-6">
								{t('common.likes')}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: DEFAULT_VIDEOS_LIMIT }).map((_, idx) => (
							<TableRow key={idx}>
								<TableCell className="pl-6">
									<div className="flex items-center gap-4">
										<Skeleton className="h-20 w-36" />
										<div className="flex flex-col gap-2">
											<Skeleton className="h-4 w-[100px]" />
											<Skeleton className="h-3 w-[150px]" />
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-20" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-16" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-24" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right pr-6">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
