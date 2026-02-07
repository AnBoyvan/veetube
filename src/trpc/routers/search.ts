import { getMany } from '@/features/search/procedures/get-many';
import { createTRPCRouter } from '@/trpc/init';

export const searchRouter = createTRPCRouter({
	getMany,
});
