import { relations } from 'drizzle-orm';
import {
	integer,
	pgEnum,
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

import { categories } from './categories';
import { comments } from './comments';
import { playlistVideos } from './playlist-videos';
import { users } from './users';
import { videoReactions } from './video-reactions';
import { videoViews } from './video-views';

export const videoVisibility = pgEnum('video_visibility', [
	'private',
	'public',
]);

export const videos = pgTable('videos', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: text('name').notNull(),
	description: text('description'),
	muxStatus: text('mux_status'),
	muxAssetId: text('mux_asset_id').unique(),
	muxUploadId: text('mux_upload_id').unique(),
	muxPlaybackId: text('mux_playback_id').unique(),
	muxTrackId: text('mux_track_id').unique(),
	muxTrackStatus: text('mux_track_status'),
	thumbnailUrl: text('thumbnail_url'),
	thumbnailKey: text('thumbnail_key'),
	previewUrl: text('preview_url'),
	previewKey: text('preview_key'),
	duration: integer('duration').default(0).notNull(),
	visibility: videoVisibility('visibility').default('private').notNull(),
	userId: uuid('user_id')
		.references(() => users.id, {
			onDelete: 'cascade',
		})
		.notNull(),
	categoryId: uuid('category_id').references(() => categories.id, {
		onDelete: 'set null',
	}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const videoRelations = relations(videos, ({ one, many }) => ({
	user: one(users, {
		fields: [videos.userId],
		references: [users.id],
	}),
	category: one(categories, {
		fields: [videos.categoryId],
		references: [categories.id],
	}),
	views: many(videoViews),
	reactions: many(videoReactions),
	comments: many(comments),
	playlistVideos: many(playlistVideos),
}));

export const videoInsertSchema = createInsertSchema(videos);
export const videoUpdateSchema = createUpdateSchema(videos);
export const videoSelectSchema = createSelectSchema(videos);
