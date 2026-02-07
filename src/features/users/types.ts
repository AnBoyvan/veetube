import type { inferRouterOutputs } from '@trpc/server';
import type z from 'zod';

import type { userSelectSchema } from '@/db/schema/users';
import type { AppRouter } from '@/trpc/routers/_app';

export type UsersGetOneOutput =
	inferRouterOutputs<AppRouter>['users']['getOne'];

export type UserType = z.infer<typeof userSelectSchema>;
