import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { users, videoReactions, videos, videoViews } from '@/db/schema';
import { MAX_VIDEOS_LIMIT } from '@/lib/constants';
import { baseProcedure } from '@/trpc/init';

export const getManyTrending = baseProcedure
	.input(
		z.object({
			cursor: z
				.object({
					id: z.uuid(),
					viewCount: z.number(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_VIDEOS_LIMIT),
		}),
	)
	.query(async ({ input }) => {
		const { cursor, limit } = input;

		const viewCountSubquery = db.$count(
			videoViews,
			eq(videoViews.videoId, videos.id),
		);

		const data = await db
			.select({
				...getTableColumns(videos),
				user: users,
				viewCount: viewCountSubquery,
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
			.where(
				and(
					eq(videos.visibility, 'public'),
					cursor
						? or(
								lt(viewCountSubquery, cursor.viewCount),
								and(
									eq(viewCountSubquery, cursor.viewCount),
									lt(videos.id, cursor.id),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(viewCountSubquery), desc(videos.id))
			.limit(limit + 1);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					id: lastItem.id,
					viewCount: lastItem.viewCount,
				}
			: null;

		return { items, nextCursor };
	});
