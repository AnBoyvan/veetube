import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { videoReactions } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const like = protectedProcedure
	.input(z.object({ videoId: z.string().uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { videoId } = input;

		const [existingVideoReactionLike] = await db
			.select()
			.from(videoReactions)
			.where(
				and(
					eq(videoReactions.userId, userId),
					eq(videoReactions.videoId, videoId),
					eq(videoReactions.type, 'like'),
				),
			);

		if (existingVideoReactionLike) {
			const [deletedVideoReaction] = await db
				.delete(videoReactions)
				.where(
					and(
						eq(videoReactions.userId, userId),
						eq(videoReactions.videoId, videoId),
					),
				)
				.returning();

			return deletedVideoReaction;
		}

		const [createdVideoReaction] = await db
			.insert(videoReactions)
			.values({ userId, videoId, type: 'like' })
			.onConflictDoUpdate({
				target: [videoReactions.userId, videoReactions.videoId],
				set: {
					type: 'like',
				},
			})
			.returning();

		return createdVideoReaction;
	});
