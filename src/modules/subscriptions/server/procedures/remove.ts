import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const remove = protectedProcedure
	.input(z.object({ userId: z.string().uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { userId } = input;

		if (userId === ctx.user.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [deletedSubscription] = await db
			.delete(subscriptions)
			.where(
				and(
					eq(subscriptions.viewerId, ctx.user.id),
					eq(subscriptions.creatorId, userId),
				),
			)
			.returning();

		return deletedSubscription;
	});
