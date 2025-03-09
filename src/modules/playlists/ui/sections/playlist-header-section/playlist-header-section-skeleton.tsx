import { Skeleton } from '@/components/ui/skeleton';

export const PlaylistHeaderSectionSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-2">
			<Skeleton className="h-6 w-40" />
			<Skeleton className="h-4 w-52" />
		</div>
	);
};
