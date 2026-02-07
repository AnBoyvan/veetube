import { getMany } from '@/features/categories/procedures/get-many';
import { createTRPCRouter } from '@/trpc/init';

export const categoriesRouter = createTRPCRouter({
	getMany,
});
