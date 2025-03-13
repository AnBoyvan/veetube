import { useClerk } from '@clerk/nextjs';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

import { VideoGetOneOutput } from '../../types';

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
	const clerk = useClerk();
	const utils = trpc.useUtils();

	const like = trpc.videoReactions.like.useMutation({
		onSuccess: () => {
			utils.videos.getOne.invalidate({ id: videoId });
			utils.playlists.getLiked.invalidate();
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

	const dislike = trpc.videoReactions.dislike.useMutation({
		onSuccess: () => {
			utils.videos.getOne.invalidate({ id: videoId });
			utils.playlists.getLiked.invalidate();
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

	return (
		<div className="flex items-center flex-none">
			<Button
				variant="secondary"
				disabled={like.isPending || dislike.isPending}
				onClick={() => like.mutate({ videoId })}
				className="[&_svg]:size-5 rounded-l-full rounder-r-none gap-2 pr-2"
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
				className="[&_svg]:size-5 rounded-r-full rounder-l-none pl-3"
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
