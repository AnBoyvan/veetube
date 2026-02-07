import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { playlists } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const remove = protectedProcedure
	.input(
		z.object({
			id: z.uuid(),
		}),
	)
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { id } = input;

		const [removedPlaylist] = await db
			.delete(playlists)
			.where(and(eq(playlists.id, id), eq(playlists.userId, userId)))
			.returning();

		if (!removedPlaylist) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return removedPlaylist;
	});
