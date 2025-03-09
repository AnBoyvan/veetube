import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const create = protectedProcedure
	.input(z.object({ userId: z.string().uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { userId } = input;

		if (userId === ctx.user.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [createdSubscription] = await db
			.insert(subscriptions)
			.values({
				viewerId: ctx.user.id,
				creatorId: userId,
			})
			.returning();

		return createdSubscription;
	});
