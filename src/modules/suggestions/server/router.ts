import { createTRPCRouter } from '@/trpc/init';

import { getMany } from './procedures/get-many';

export const suggestionsRouter = createTRPCRouter({
	getMany,
});
