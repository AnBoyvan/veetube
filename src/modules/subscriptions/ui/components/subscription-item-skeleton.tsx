import { Skeleton } from '@/components/ui/skeleton';

export const SubscriptionItemSkeleton = () => {
	return (
		<div className="flex items-start gap-4">
			<Skeleton className="size-10 rounded-full" />
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<div>
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-3 w-20 mt-1" />
					</div>
					<Skeleton className="h-8 w-20" />
				</div>
			</div>
		</div>
	);
};
