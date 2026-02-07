import { TRPCError } from '@trpc/server';
import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import {
	playlists,
	playlistVideos,
	users,
	videoReactions,
	videos,
	videoViews,
} from '@/db/schema';
import { MAX_VIDEOS_LIMIT } from '@/lib/constants';
import { protectedProcedure } from '@/trpc/init';

export const getVideos = protectedProcedure
	.input(
		z.object({
			playlistId: z.uuid(),
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
		const { cursor, limit, playlistId } = input;

		const [existingPlaylist] = await db
			.select()
			.from(playlists)
			.where(and(eq(playlists.id, playlistId), eq(playlists.userId, userId)));

		if (!existingPlaylist) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		const videosFromPlaylist = db.$with('playlist_videos').as(
			db
				.select({
					videoId: playlistVideos.videoId,
				})
				.from(playlistVideos)
				.where(eq(playlistVideos.playlistId, playlistId)),
		);

		const data = await db
			.with(videosFromPlaylist)
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
			.innerJoin(videosFromPlaylist, eq(videosFromPlaylist.videoId, videos.id))
			.where(
				and(
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
