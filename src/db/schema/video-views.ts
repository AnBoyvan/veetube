import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { videos } from './videos';

export const videoViews = pgTable(
	'video_views',
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
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => [
		primaryKey({
			name: 'video_views_pk',
			columns: [t.userId, t.videoId],
		}),
	],
);

export const videoViewRelations = relations(videoViews, ({ one }) => ({
	user: one(users, {
		fields: [videoViews.userId],
		references: [users.id],
	}),
	video: one(videos, {
		fields: [videoViews.videoId],
		references: [videos.id],
	}),
}));
