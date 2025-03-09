import { and, desc, eq, getTableColumns, lt, or, sql } from 'drizzle-orm';
import { z } from 'zod';

import { MAX_PLAYLISTS_LIMIT } from '@/constants';
import { db } from '@/db';
import { playlistVideos, playlists, users } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const getManyForVideo = protectedProcedure
	.input(
		z.object({
			videoId: z.string().uuid(),
			cursor: z
				.object({
					id: z.string().uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_PLAYLISTS_LIMIT),
		}),
	)
	.query(async ({ input }) => {
		const { cursor, limit, videoId } = input;

		const data = await db
			.select({
				...getTableColumns(playlists),
				videoCount: db.$count(
					playlistVideos,
					eq(playlists.id, playlistVideos.playlistId),
				),
				user: users,
				containsVideo: videoId
					? sql<boolean>`(
					SELECT EXISTS (
						SELECT 1
						FROM ${playlistVideos} pv
						WHERE pv.playlist_id = ${playlists.id} AND pv.video_id = ${videoId}
					)
				)`
					: sql<boolean>`false`,
			})
			.from(playlists)
			.innerJoin(users, eq(playlists.userId, users.id))
			.where(
				and(
					eq(playlists.userId, users.id),
					cursor
						? or(
								lt(playlists.updatedAt, cursor.updatedAt),
								and(
									eq(playlists.updatedAt, cursor.updatedAt),
									lt(playlists.id, cursor.id),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(playlists.updatedAt), desc(playlists.id))
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
