import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { commentReactions } from '@/db/schema/comment-reactions';
import { protectedProcedure } from '@/trpc/init';

export const like = protectedProcedure
	.input(z.object({ commentId: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { commentId } = input;

		const [existingCommentReactionLike] = await db
			.select()
			.from(commentReactions)
			.where(
				and(
					eq(commentReactions.userId, userId),
					eq(commentReactions.commentId, commentId),
					eq(commentReactions.type, 'like'),
				),
			);

		if (existingCommentReactionLike) {
			const [deletedCommentReaction] = await db
				.delete(commentReactions)
				.where(
					and(
						eq(commentReactions.userId, userId),
						eq(commentReactions.commentId, commentId),
					),
				)
				.returning();

			return deletedCommentReaction;
		}

		const [createdCommentReaction] = await db
			.insert(commentReactions)
			.values({ userId, commentId, type: 'like' })
			.onConflictDoUpdate({
				target: [commentReactions.userId, commentReactions.commentId],
				set: {
					type: 'like',
				},
			})
			.returning();

		return createdCommentReaction;
	});
