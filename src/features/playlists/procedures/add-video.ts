import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { playlists, playlistVideos, videos } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const addVideo = protectedProcedure
	.input(z.object({ playlistId: z.uuid(), videoId: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { playlistId, videoId } = input;

		const [existingPlaylist] = await db
			.select()
			.from(playlists)
			.where(and(eq(playlists.id, playlistId), eq(playlists.userId, userId)));

		if (!existingPlaylist) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		const [existingVideo] = await db
			.select()
			.from(videos)
			.where(eq(videos.id, videoId));

		if (!existingVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		const [existingPlaylistVideo] = await db
			.select()
			.from(playlistVideos)
			.where(
				and(
					eq(playlistVideos.playlistId, playlistId),
					eq(playlistVideos.videoId, videoId),
				),
			);

		if (existingPlaylistVideo) {
			throw new TRPCError({ code: 'CONFLICT' });
		}

		const [createdPlaylistVideo] = await db
			.insert(playlistVideos)
			.values({ playlistId, videoId })
			.returning();

		return createdPlaylistVideo;
	});
