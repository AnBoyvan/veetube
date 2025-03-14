import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { MAX_VIDEOS_LIMIT } from '@/constants';
import { db } from '@/db';
import { users, videoReactions, videoViews, videos } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const getHistory = protectedProcedure
	.input(
		z.object({
			cursor: z
				.object({
					id: z.string().uuid(),
					viewedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_VIDEOS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { cursor, limit } = input;

		const viewerVideoViews = db.$with('viewer_video_views').as(
			db
				.select({
					videoId: videoViews.videoId,
					viewedAt: videoViews.updatedAt,
				})
				.from(videoViews)
				.where(eq(videoViews.userId, userId)),
		);

		const data = await db
			.with(viewerVideoViews)
			.select({
				...getTableColumns(videos),
				user: users,
				viewedAt: viewerVideoViews.viewedAt,
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
			.innerJoin(viewerVideoViews, eq(viewerVideoViews.videoId, videos.id))
			.where(
				and(
					cursor
						? or(
								lt(viewerVideoViews.viewedAt, cursor.viewedAt),
								and(
									eq(viewerVideoViews.viewedAt, cursor.viewedAt),
									lt(videos.id, cursor.id),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(viewerVideoViews.viewedAt), desc(videos.id))
			.limit(limit + 1);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					id: lastItem.id,
					viewedAt: lastItem.viewedAt,
				}
			: null;

		return { items, nextCursor };
	});
