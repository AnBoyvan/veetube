import { createTRPCRouter } from '@/trpc/init';

import { create } from './procedures/create';

export const videoViewsRouter = createTRPCRouter({
	create,
});
