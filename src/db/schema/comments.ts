import { relations } from 'drizzle-orm';
import {
	foreignKey,
	pgTable,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from 'drizzle-zod';

import { commentReactions } from './comment-reactions';
import { users } from './users';
import { videos } from './videos';

export const comments = pgTable(
	'comments',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		parentId: uuid('parent_id'),
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
		value: text('value').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => {
		return [
			foreignKey({
				columns: [t.parentId],
				foreignColumns: [t.id],
				name: 'comments_parent_id_fkey',
			}).onDelete('cascade'),
		];
	},
);

export const commentRelations = relations(comments, ({ one, many }) => ({
	user: one(users, {
		fields: [comments.userId],
		references: [users.id],
	}),
	video: one(videos, {
		fields: [comments.videoId],
		references: [videos.id],
	}),
	reactions: many(commentReactions),
	parent: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
		relationName: 'comments_parent_id_fkey',
	}),
	// replies: many(comments, {
	// 	relationName: 'comments_reply_id_fkey',
	// }),
}));

export const commentInsertSchema = createInsertSchema(comments);
export const commentUpdateSchema = createUpdateSchema(comments);
export const commentSelectSchema = createSelectSchema(comments);
