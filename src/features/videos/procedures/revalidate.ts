import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { mux } from '@/lib/mux';
import { protectedProcedure } from '@/trpc/init';

export const revalidate = protectedProcedure
	.input(z.object({ id: z.uuid() }))
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		if (!input.id) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		const [existingVideo] = await db
			.select()
			.from(videos)
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)));

		if (!existingVideo) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		if (!existingVideo.muxUploadId) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const upload = await mux.video.uploads.retrieve(existingVideo.muxUploadId);

		if (!upload || !upload.asset_id) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const asset = await mux.video.assets.retrieve(upload.asset_id);

		if (!asset) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		const playbackId = asset.playback_ids?.[0].id;
		const duration = asset.duration ? Math.round(asset.duration * 1000) : 0;

		const [updatedVideo] = await db
			.update(videos)
			.set({
				muxStatus: asset.status,
				muxPlaybackId: playbackId,
				muxAssetId: asset.id,
				duration,
				updatedAt: new Date(),
			})
			.where(and(eq(videos.id, input.id), eq(videos.userId, userId)))
			.returning();

		return updatedVideo;
	});
