import { getMany } from '@/features/studio/procedures/get-many';
import { getOne } from '@/features/studio/procedures/get-one';
import { createTRPCRouter } from '@/trpc/init';

export const studioRouter = createTRPCRouter({
	getOne,
	getMany,
});
