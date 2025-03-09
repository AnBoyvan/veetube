import { createTRPCRouter } from '@/trpc/init';

import { create } from './procedures/create';
import { getMany } from './procedures/get-many';
import { remove } from './procedures/remove';

export const subscriptionsRouter = createTRPCRouter({
	create,
	getMany,
	remove,
});
