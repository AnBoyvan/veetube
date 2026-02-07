import { relations } from 'drizzle-orm';
import {
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

import { commentReactions } from './comment-reactions';
import { comments } from './comments';
import { playlists } from './playlists';
import { subscriptions } from './subscriptions';
import { videoReactions } from './video-reactions';
import { videoViews } from './video-views';
import { videos } from './videos';

export const users = pgTable(
	'users',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		clerkId: text('clerk_id').unique().notNull(),
		name: text('name').notNull(),
		bannerUrl: text('banner_url'),
		bannerKey: text('banner_key'),
		imageUrl: text('imageUrl').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => [uniqueIndex('clerk_id_idx').on(t.clerkId)],
);

export const userRelations = relations(users, ({ many }) => ({
	videos: many(videos),
	videoViews: many(videoViews),
	videoReactions: many(videoReactions),
	subscriptions: many(subscriptions, {
		relationName: 'subscriptions_viewer_id_fkey',
	}),
	subscribers: many(subscriptions, {
		relationName: 'subscriptions_creator_id_fkey',
	}),
	comments: many(comments),
	commentReactions: many(commentReactions),
	playlists: many(playlists),
}));

export const userSelectSchema = createSelectSchema(users);
