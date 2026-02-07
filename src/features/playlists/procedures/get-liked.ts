import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { users, videoReactions, videos, videoViews } from '@/db/schema';
import { MAX_VIDEOS_LIMIT } from '@/lib/constants';
import { protectedProcedure } from '@/trpc/init';

export const getLiked = protectedProcedure
	.input(
		z.object({
			cursor: z
				.object({
					id: z.uuid(),
					likedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_VIDEOS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { cursor, limit } = input;

		const viewerVideoRreactions = db.$with('viewer_video_reactions').as(
			db
				.select({
					videoId: videoReactions.videoId,
					likedAt: videoReactions.updatedAt,
				})
				.from(videoReactions)
				.where(
					and(
						eq(videoReactions.userId, userId),
						eq(videoReactions.type, 'like'),
					),
				),
		);

		const data = await db
			.with(viewerVideoRreactions)
			.select({
				...getTableColumns(videos),
				user: users,
				likedAt: viewerVideoRreactions.likedAt,
				viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
				likeCount: db.$count(
					videoReactions,
					and(
						eq(videoReactions.videoId, videos.id),
						eq(videoReactions.type, 'like'),
					),
				),
				dislikeCount: db.$count(
					videoReactions,
					and(
						eq(videoReactions.videoId, videos.id),
						eq(videoReactions.type, 'dislike'),
					),
				),
			})
			.from(videos)
			.innerJoin(users, eq(videos.userId, users.id))
			.innerJoin(
				viewerVideoRreactions,
				eq(viewerVideoRreactions.videoId, videos.id),
			)
			.where(
				and(
					cursor
						? or(
								lt(viewerVideoRreactions.likedAt, cursor.likedAt),
								and(
									eq(viewerVideoRreactions.likedAt, cursor.likedAt),
									lt(videos.id, cursor.id),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(viewerVideoRreactions.likedAt), desc(videos.id))
			.limit(limit + 1);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					id: lastItem.id,
					likedAt: lastItem.likedAt,
				}
			: null;

		return { items, nextCursor };
	});
