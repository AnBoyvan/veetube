import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const remove = protectedProcedure
	.input(z.object({ id: z.string().uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		if (!input.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [removedVideo] = await db
			.delete(videos)
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
			.returning();

		if (!removedVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return removedVideo;
	});
