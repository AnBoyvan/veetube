import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { videos, videoUpdateSchema } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const update = protectedProcedure
	.input(videoUpdateSchema)
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		if (!input.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [updatedVideo] = await db
			.update(videos)
			.set({
				title: input.title,
				description: input.description,
				categoryId: input.categoryId,
				visibility: input.visibility,
				updatedAt: new Date(),
			})
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
			.returning();

		if (!updatedVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return updatedVideo;
	});
