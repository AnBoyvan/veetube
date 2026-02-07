import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const getOne = protectedProcedure
	.input(z.object({ id: z.uuid() }))
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { id } = input;

		const [video] = await db
			.select()
			.from(videos)
			.where(and(eq(videos.id, id), eq(videos.userId, userId)));

		if (!video) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return video;
	});
