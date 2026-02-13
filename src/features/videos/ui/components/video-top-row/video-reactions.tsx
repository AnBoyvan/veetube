import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { VideoGetOneOutput } from '@/features/videos/types';
import { cn } from '@/lib/utils/cn';

import { useDislikeVideo } from '../../../../video-reactions/hooks/use-dislike-video';
import { useLikeVideo } from '../../../../video-reactions/hooks/use-like-video';

interface VideoReactionsProps {
	videoId: string;
	likes: number;
	dislikes: number;
	viewerReaction: VideoGetOneOutput['viewerReaction'];
}

export const VideoReactions = ({
	videoId,
	likes,
	dislikes,
	viewerReaction,
}: VideoReactionsProps) => {
	const like = useLikeVideo();
	const dislike = useDislikeVideo();

	return (
		<div className="flex flex-none items-center">
			<Button
				variant="secondary"
				disabled={like.isPending || dislike.isPending}
				onClick={() => like.mutate({ videoId })}
				className="rounder-r-none gap-2 rounded-l-full pr-2 [&_svg]:size-5"
			>
				<ThumbsUpIcon
					className={cn(
						viewerReaction === 'like' && 'fill-secondary-foreground',
					)}
				/>
				{likes}
			</Button>
			<Separator orientation="vertical" className="h-full" />
			<Button
				variant="secondary"
				disabled={like.isPending || dislike.isPending}
				onClick={() => dislike.mutate({ videoId })}
				className="rounder-l-none rounded-r-full pl-3 [&_svg]:size-5"
			>
				<ThumbsDownIcon
					className={cn(
						viewerReaction === 'dislike' && 'fill-secondary-foreground',
					)}
				/>
				{dislikes}
			</Button>
		</div>
	);
};
