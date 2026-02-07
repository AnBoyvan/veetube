import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';

import { playlists } from './playlists';
import { videos } from './videos';

export const playlistVideos = pgTable(
	'playlist_videos',
	{
		playlistId: uuid('playlist_id')
			.references(() => playlists.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		videoId: uuid('video_id')
			.references(() => videos.id, {
				onDelete: 'cascade',
			})
			.notNull(),
		position: integer('position'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull(),
	},
	t => [
		primaryKey({
			name: 'playlist_videos_pk',
			columns: [t.playlistId, t.videoId],
		}),
	],
);

export const playlistVideoRelations = relations(playlistVideos, ({ one }) => ({
	playlist: one(playlists, {
		fields: [playlistVideos.videoId],
		references: [playlists.id],
	}),
	video: one(videos, {
		fields: [playlistVideos.videoId],
		references: [videos.id],
	}),
}));
