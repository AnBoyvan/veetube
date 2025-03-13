import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { playlists } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const update = protectedProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string().min(1),
			description: z.string().nullish(),
		}),
	)
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;

		const [updatedPlaylist] = await db
			.update(playlists)
			.set({
				name: input.name,
				description: input.description,
			})
			.where(and(eq(playlists.id, playlists.id), eq(playlists.userId, userId)))
			.returning();

		if (!updatedPlaylist) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		return updatedPlaylist;
	});
