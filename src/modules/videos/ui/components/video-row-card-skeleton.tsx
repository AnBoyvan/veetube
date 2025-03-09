import { VariantProps } from 'class-variance-authority';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { thumbnailVariants, videoRowCardVariants } from './video-row-card';
import { VideoThumbnailSkeleton } from './video-thumbnail-skeleton';

interface VideoRowCardSkeletonProps
	extends VariantProps<typeof videoRowCardVariants> {}

export const VideoRowCardSkeleton = ({
	size = 'default',
}: VideoRowCardSkeletonProps) => {
	return (
		<div className={videoRowCardVariants({ size })}>
			<div className={thumbnailVariants({ size })}>
				<VideoThumbnailSkeleton />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex justify-between gap-x-2">
					<div className="flex-1 min-w-0">
						<Skeleton
							className={cn('h-5 w-[40%]', size === 'compact' && 'h-4 w-[40%]')}
						/>
						{size === 'default' && (
							<>
								<Skeleton className="h-4 w-[20%] mt-1" />
								<div className="flex items-center gap-2 my-3">
									<Skeleton className="size-8 rounded-full" />
									<Skeleton className="h-4 w-24" />
								</div>
							</>
						)}
						{size === 'compact' && <Skeleton className="h-4 w-[50%] mt-1" />}
					</div>
				</div>
			</div>
		</div>
	);
};
