import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';

import { reactionsType } from './enums';
import { users } from './users';
import { videos } from './videos';

export const videoReactions = pgTable(
	'video_reactions',
	{
		userId: uuid('user_id')
			.references(() => users.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		videoId: uuid('video_id')
			.references(() => videos.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		type: reactionsType('type').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => [
		primaryKey({
			name: 'video_reactions_pk',
			columns: [t.userId, t.videoId],
		}),
	],
);

export const videoReactionRelations = relations(videoReactions, ({ one }) => ({
	user: one(users, {
		fields: [videoReactions.userId],
		references: [users.id],
	}),
	video: one(videos, {
		fields: [videoReactions.videoId],
		references: [videos.id],
	}),
}));
