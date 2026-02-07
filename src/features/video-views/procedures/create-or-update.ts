import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { videoViews } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const createOrUdate = protectedProcedure
	.input(z.object({ videoId: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { videoId } = input;

		const [existingVideoView] = await db
			.select()
			.from(videoViews)
			.where(
				and(eq(videoViews.userId, userId), eq(videoViews.videoId, videoId)),
			);

		if (existingVideoView) {
			const [updatedVideoView] = await db
				.update(videoViews)
				.set({ updatedAt: new Date() })
				.where(
					and(eq(videoViews.userId, userId), eq(videoViews.videoId, videoId)),
				)
				.returning();

			return updatedVideoView || existingVideoView;
		}

		const [createdVideoView] = await db
			.insert(videoViews)
			.values({ userId, videoId })
			.returning();

		return createdVideoView;
	});
