import { create } from '@/features/subscriptions/procedures/create';
import { getMany } from '@/features/subscriptions/procedures/get-many';
import { remove } from '@/features/subscriptions/procedures/remove';
import { createTRPCRouter } from '@/trpc/init';

export const subscriptionsRouter = createTRPCRouter({
	create,
	getMany,
	remove,
});
