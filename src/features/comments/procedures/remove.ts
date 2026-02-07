import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { comments } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const remove = protectedProcedure
	.input(z.object({ id: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		const [deletedComment] = await db
			.delete(comments)
			.where(and(eq(comments.userId, userId), eq(comments.id, input.id)))
			.returning();

		if (!deletedComment) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return deletedComment;
	});
