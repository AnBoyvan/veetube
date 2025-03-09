import { Skeleton } from '@/components/ui/skeleton';

export const PlaylistInfoSkeleton = () => {
	return (
		<div className="flex gap-3">
			<div className="min-w-0 flex-1">
				<Skeleton className="h-5 w-[90%]" />
				<Skeleton className="h-5 w-[50%]" />
				<Skeleton className="h-5 w-[70%]" />
			</div>
		</div>
	);
};
