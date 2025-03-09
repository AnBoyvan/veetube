import { and, desc, eq, getTableColumns, ilike, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { MAX_VIDEOS_LIMIT } from '@/constants';
import { db } from '@/db';
import { users, videoReactions, videoViews, videos } from '@/db/schema';
import { baseProcedure } from '@/trpc/init';

export const getMany = baseProcedure
	.input(
		z.object({
			query: z.string().nullish(),
			categoryId: z.string().uuid().nullish(),
			cursor: z
				.object({
					id: z.string().uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_VIDEOS_LIMIT),
		}),
	)
	.query(async ({ input }) => {
		const { cursor, limit, query, categoryId } = input;

		const data = await db
			.select({
				...getTableColumns(videos),
				user: users,
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
			.where(
				and(
					ilike(videos.title, `%${query}%`),
					eq(videos.visibility, 'public'),
					categoryId ? eq(videos.categoryId, categoryId) : undefined,
					cursor
						? or(
								lt(videos.updatedAt, cursor.updatedAt),
								and(
									eq(videos.updatedAt, cursor.updatedAt),
									lt(videos.id, cursor.id),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(videos.updatedAt), desc(videos.id))
			.limit(limit + 1);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					id: lastItem.id,
					updatedAt: lastItem.updatedAt,
				}
			: null;

		return { items, nextCursor };
	});
