import {
	and,
	count,
	desc,
	eq,
	getTableColumns,
	inArray,
	isNotNull,
	isNull,
	lt,
	or,
} from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { comments, users } from '@/db/schema';
import { commentReactions } from '@/db/schema/comment-reactions';
import { MAX_COMMENTS_LIMIT } from '@/lib/constants';
import { baseProcedure } from '@/trpc/init';

export const getMany = baseProcedure
	.input(
		z.object({
			videoId: z.uuid(),
			parentId: z.uuid().nullish(),
			cursor: z
				.object({
					id: z.uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_COMMENTS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { clerkUserId } = ctx;
		const { videoId, cursor, limit, parentId } = input;

		let userId: string | null = null;

		const [user] = await db
			.select()
			.from(users)
			.where(inArray(users.clerkId, clerkUserId ? [clerkUserId] : []));

		if (user) {
			userId = user.id;
		}

		const viewerReactions = db.$with('viewer_reactions').as(
			db
				.select({
					commentId: commentReactions.commentId,
					type: commentReactions.type,
				})
				.from(commentReactions)
				.where(inArray(commentReactions.userId, userId ? [userId] : [])),
		);

		const replies = db.$with('replies').as(
			db
				.select({
					parentId: comments.parentId,
					count: count(comments.id).as('count'),
				})
				.from(comments)
				.where(and(eq(comments.videoId, videoId), isNotNull(comments.parentId)))
				.groupBy(comments.parentId),
		);

		const [data, totalData] = await Promise.all([
			db
				.with(viewerReactions, replies)
				.select({
					...getTableColumns(comments),
					user: users,
					viewerReaction: viewerReactions.type,
					replyCount: replies.count,
					likeCount: db.$count(
						commentReactions,
						and(
							eq(commentReactions.commentId, comments.id),
							eq(commentReactions.type, 'like'),
						),
					),
					dislikeCount: db.$count(
						commentReactions,
						and(
							eq(commentReactions.commentId, comments.id),
							eq(commentReactions.type, 'dislike'),
						),
					),
				})
				.from(comments)
				.where(
					and(
						eq(comments.videoId, videoId),
						parentId
							? eq(comments.parentId, parentId)
							: isNull(comments.parentId),
						cursor
							? or(
									lt(comments.updatedAt, cursor.updatedAt),
									and(
										eq(comments.updatedAt, cursor.updatedAt),
										lt(comments.id, cursor.id),
									),
								)
							: undefined,
					),
				)
				.innerJoin(users, eq(comments.userId, users.id))
				.leftJoin(viewerReactions, eq(viewerReactions.commentId, comments.id))
				.leftJoin(replies, eq(comments.id, replies.parentId))
				.orderBy(desc(comments.updatedAt), desc(comments.id))
				.limit(limit + 1),

			db
				.select({
					count: count(),
				})
				.from(comments)
				.where(eq(comments.videoId, videoId)),
		]);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					id: lastItem.id,
					updatedAt: lastItem.updatedAt,
				}
			: null;

		return { totalCount: totalData[0].count, items, nextCursor };
	});
