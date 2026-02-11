import { createOrUpdate } from '@/features/video-views/procedures/create-or-update';
import { createTRPCRouter } from '@/trpc/init';

export const videoViewsRouter = createTRPCRouter({
	createOrUpdate: createOrUpdate,
});
