import { serve } from '@upstash/workflow/nextjs';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { videos } from '@/db/schema';
import { TITLE_SYSTEM_PROMPT } from '@/features/videos/prompts/title-system-prompt';

interface InputType {
	userId: string;
	videoId: string;
}

export const { POST } = serve(async context => {
	const input = context.requestPayload as InputType;

	const { userId, videoId } = input;

	const video = await context.run('get-video', async () => {
		const [existingVideo] = await db
			.select()
			.from(videos)
			.where(and(eq(videos.id, videoId), eq(videos.userId, userId)));

		if (!existingVideo) {
			throw new Error('Not found');
		}

		return existingVideo;
	});

	const transcript = await context.run('get-transcript', async () => {
		const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
		const response = await fetch(trackUrl);
		const text = response.text();

		if (!text) {
			throw new Error('Bad request');
		}

		return text;
	});

	const { body } = await context.api.openai.call('generate-title', {
		token: process.env.OPENAI_API_KEY,
		operation: 'chat.completions.create',
		body: {
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content: TITLE_SYSTEM_PROMPT,
				},
				{
					role: 'user',
					content: transcript,
				},
			],
		},
	});

	const title = body.choices[0]?.message.content;

	if (!title) {
		throw new Error('Bad request');
	}

	await context.run('update-video', async () => {
		await db
			.update(videos)
			.set({
				title: title || video.title,
				updatedAt: new Date(),
			})
			.where(and(eq(videos.id, videoId), eq(videos.userId, userId)))
			.returning();
	});
});
