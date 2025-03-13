import { createTRPCRouter } from '@/trpc/init';

import { createOrUdate } from './procedures/createOrUpdate';

export const videoViewsRouter = createTRPCRouter({
	createOrUdate,
});
