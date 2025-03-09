import { createTRPCRouter } from '@/trpc/init';

import { getOne } from './procedures/get-one';

export const usersRouter = createTRPCRouter({
	getOne,
});
