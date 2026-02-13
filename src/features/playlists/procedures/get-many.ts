import { and, desc, eq, getTableColumns, lt, or, sql } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { playlists, playlistVideos, users, videos } from '@/db/schema';
import { MAX_PLAYLISTS_LIMIT } from '@/lib/constants';
import { protectedProcedure } from '@/trpc/init';

export const getMany = protectedProcedure
	.input(
		z.object({
			cursor: z
				.object({
					id: z.uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_PLAYLISTS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { cursor, limit } = input;
		const { id: userId } = ctx.user;

		const data = await db
			.select({
				...getTableColumns(playlists),
				videoCount: db.$count(
					playlistVideos,
					eq(playlists.id, playlistVideos.playlistId),
				),
				user: users,
				thumbnailUrl: sql<string | null>`(
					SELECT v.thumbnail_url
					FROM ${playlistVideos} pv
					JOIN ${videos} v ON v.id = pv.video_id
					WHERE pv.playlist_id = ${playlists.id}
					ORDER BY pv.updated_at DESC
					LIMIT 1
				)`,
			})
			.from(playlists)
			.innerJoin(users, eq(playlists.userId, users.id))
			.where(
				and(
					eq(playlists.userId, userId),
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
