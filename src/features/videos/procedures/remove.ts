import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { UTApi } from 'uploadthing/server';
import { z } from 'zod';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';
import { protectedProcedure } from '@/trpc/init';

export const remove = protectedProcedure
	.input(z.object({ id: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		if (!input.id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const [removedVideo] = await db
			.delete(videos)
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
			.returning();

		if (!removedVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}
		const utapi = new UTApi();

		if (removedVideo.thumbnailKey) {
			await utapi.deleteFiles(removedVideo.thumbnailKey);
		}

		if (removedVideo.previewKey) {
			await utapi.deleteFiles(removedVideo.previewKey);
		}

		if (removedVideo.muxAssetId) {
			await mux.video.assets.delete(removedVideo.muxAssetId);
		}

		return removedVideo;
	});
