import { dislike } from '@/features/comment-reactions/procedures/dislike';
import { like } from '@/features/comment-reactions/procedures/like';
import { createTRPCRouter } from '@/trpc/init';

export const commentReactionsRouter = createTRPCRouter({
	like,
	dislike,
});
