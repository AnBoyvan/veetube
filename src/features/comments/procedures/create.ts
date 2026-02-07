import { TRPCError } from '@trpc/server';
import { inArray } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { comments } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const create = protectedProcedure
	.input(
		z.object({
			videoId: z.uuid(),
			value: z.string(),
			parentId: z.uuid().nullish(),
		}),
	)
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { videoId, value, parentId } = input;

		const [existingComment] = await db
			.select()
			.from(comments)
			.where(inArray(comments.id, parentId ? [parentId] : []));

		if (!existingComment && parentId) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		if (existingComment?.parentId && parentId) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [createdComment] = await db
			.insert(comments)
			.values({ userId, videoId, value, parentId })
			.returning();

		return createdComment;
	});
