import { create } from '@/features/comments/procedures/create';
import { getMany } from '@/features/comments/procedures/get-many';
import { remove } from '@/features/comments/procedures/remove';
import { createTRPCRouter } from '@/trpc/init';

export const commentsRouter = createTRPCRouter({
	getMany,
	create,
	remove,
});
