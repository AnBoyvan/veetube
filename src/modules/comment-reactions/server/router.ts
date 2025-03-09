import { createTRPCRouter } from '@/trpc/init';

import { dislike } from './procedures/dislike';
import { like } from './procedures/like';

export const commentReactionsRouter = createTRPCRouter({
	like,
	dislike,
});
