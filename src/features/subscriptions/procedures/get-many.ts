import { and, desc, eq, getTableColumns, lt, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db';
import { subscriptions, users } from '@/db/schema';
import { MAX_SUBSCRIPTIONS_LIMIT } from '@/lib/constants';
import { protectedProcedure } from '@/trpc/init';

export const getMany = protectedProcedure
	.input(
		z.object({
			cursor: z
				.object({
					creatorId: z.string().uuid(),
					updatedAt: z.date(),
				})
				.nullish(),
			limit: z.number().min(1).max(MAX_SUBSCRIPTIONS_LIMIT),
		}),
	)
	.query(async ({ ctx, input }) => {
		const { id: userId } = ctx.user;
		const { cursor, limit } = input;

		const data = await db
			.select({
				...getTableColumns(subscriptions),
				user: {
					...getTableColumns(users),
					subscriberCount: db.$count(
						subscriptions,
						eq(subscriptions.creatorId, users.id),
					),
				},
			})
			.from(subscriptions)
			.innerJoin(users, eq(subscriptions.creatorId, users.id))
			.where(
				and(
					eq(subscriptions.viewerId, userId),
					cursor
						? or(
								lt(subscriptions.updatedAt, cursor.updatedAt),
								and(
									eq(subscriptions.updatedAt, cursor.updatedAt),
									lt(subscriptions.creatorId, cursor.creatorId),
								),
							)
						: undefined,
				),
			)
			.orderBy(desc(subscriptions.updatedAt), desc(subscriptions.creatorId))
			.limit(limit + 1);

		const hasMore = data.length > limit;

		const items = hasMore ? data.slice(0, -1) : data;

		const lastItem = items[items.length - 1];

		const nextCursor = hasMore
			? {
					creatorId: lastItem.creatorId,
					updatedAt: lastItem.updatedAt,
				}
			: null;

		return { items, nextCursor };
	});
