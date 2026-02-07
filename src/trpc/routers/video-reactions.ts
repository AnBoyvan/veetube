import { dislike } from '@/features/video-reactions/procedures/dislike';
import { like } from '@/features/video-reactions/procedures/like';
import { createTRPCRouter } from '@/trpc/init';

export const videoReactionsRouter = createTRPCRouter({
	like,
	dislike,
});
