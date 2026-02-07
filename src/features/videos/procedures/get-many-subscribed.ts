import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import {
	subscriptions,
	users,
	videoReactions,
	videos,
	videoViews,
} from '@/db/schema';
import { MAX_VIDEOS_LIMIT } from '@/lib/constants';
import { protectedProcedure } from '@/trpc/init';

export const getManySubscribed = protectedProcedure
	.input(
		z.object({
			cursor: z
				.object({
					id: z.uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_VIDEOS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { cursor, limit } = input;

		const viewerSubscriptions = db.$with('viewer-subscriptions').as(
			db
				.select({
					userId: subscriptions.creatorId,
				})
				.from(subscriptions)
				.where(eq(subscriptions.viewerId, userId)),
		);

		const data = await db
			.with(viewerSubscriptions)
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
			.innerJoin(viewerSubscriptions, eq(viewerSubscriptions.userId, users.id))
			.where(
				and(
					eq(videos.visibility, 'public'),
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
