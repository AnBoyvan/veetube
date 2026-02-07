import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { UTApi } from 'uploadthing/server';
import { z } from 'zod';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const restoreThumbnail = protectedProcedure
	.input(z.object({ id: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		if (!input.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [existingVideo] = await db
			.select()
			.from(videos)
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)));

		if (!existingVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		if (!existingVideo.muxPlaybackId) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		if (existingVideo.thumbnailKey) {
			const utapi = new UTApi();

			await utapi.deleteFiles(existingVideo.thumbnailKey);
			await db
				.update(videos)
				.set({ thumbnailKey: null, thumbnailUrl: null })
				.where(and(eq(videos.id, input.id), eq(videos.userId, userId)));
		}

		const tempThumbnailUrl = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.jpg`;

		const utapi = new UTApi();
		const { data } = await utapi.uploadFilesFromUrl(tempThumbnailUrl);

		if (!data) {
			throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
		}

		const { key: thumbnailKey, ufsUrl: thumbnailUrl } = data;

		const [updatedVideo] = await db
			.update(videos)
			.set({ thumbnailUrl, thumbnailKey, updatedAt: new Date() })
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
			.returning();

		return updatedVideo;
	});
