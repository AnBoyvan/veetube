import { createTRPCRouter } from '@/trpc/init';

import { dislike } from './procedures/dislike';
import { like } from './procedures/like';

export const videoReactionsRouter = createTRPCRouter({
	like,
	dislike,
});
