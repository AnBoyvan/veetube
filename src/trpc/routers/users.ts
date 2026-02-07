import { getOne } from '@/features/users/procedures/get-one';
import { createTRPCRouter } from '@/trpc/init';

export const usersRouter = createTRPCRouter({
	getOne,
});
