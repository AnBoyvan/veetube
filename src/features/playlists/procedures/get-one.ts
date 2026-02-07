import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { playlists } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const getOne = protectedProcedure
	.input(
		z.object({
			id: z.uuid(),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { id } = input;

		const [existingPlaylist] = await db
			.select()
			.from(playlists)
			.where(and(eq(playlists.id, id), eq(playlists.userId, userId)));

		if (!existingPlaylist) {
			throw new TRPCError({ code: 'NOT_FOUND' });
		}

		return existingPlaylist;
	});
