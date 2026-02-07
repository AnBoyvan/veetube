import { getMany } from '@/features/suggestions/procedures/get-many';
import { createTRPCRouter } from '@/trpc/init';

export const suggestionsRouter = createTRPCRouter({
	getMany,
});
