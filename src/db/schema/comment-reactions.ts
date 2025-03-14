import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';

import { comments } from './comments';
import { reactionsType } from './enums';
import { users } from './users';

export const commentReactions = pgTable(
	'comment_reactions',
	{
		userId: uuid('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		commentId: uuid('comment_id')
			.references(() => comments.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		type: reactionsType('type').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => [
		primaryKey({
			name: 'comment_reactions_pk',
			columns: [t.userId, t.commentId],
		}),
	],
);

export const commentReactionRelations = relations(
	commentReactions,
	({ one }) => ({
		user: one(users, {
			fields: [commentReactions.userId],
			references: [users.id],
		}),
		comment: one(comments, {
			fields: [commentReactions.commentId],
			references: [comments.id],
		}),
	}),
);
