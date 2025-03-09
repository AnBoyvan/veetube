import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/db';
import { playlists } from '@/db/schema';
import { protectedProcedure } from '@/trpc/init';

export const create = protectedProcedure
	.input(
		z.object({ name: z.string().min(1), description: z.string().nullish() }),
	)
	.mutation(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { name, description } = input;

		const [createdPlaylist] = await db
			.insert(playlists)
			.values({
				userId,
				name,
				description,
			})
			.returning();

		if (!createdPlaylist) {
			throw new TRPCError({ code: 'BAD_REQUEST' });
		}

		return createdPlaylist;
	});
