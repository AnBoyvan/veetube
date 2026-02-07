import { headers } from 'next/headers';

import type { WebhookEvent } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { Webhook } from 'svix';
import { UTApi } from 'uploadthing/server';

import { db } from '@/db';
import { users } from '@/db/schema';

export async function POST(req: Request) {
	const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

	if (!SIGNING_SECRET) {
		throw new Error(
			'Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
		);
	}

	const wh = new Webhook(SIGNING_SECRET);

	const headerPayload = await headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error: Missing Svix headers', {
			status: 400,
		});
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch {
		return new Response('Error: Verification error', {
			status: 400,
		});
	}

	if (evt.type === 'user.created') {
		const { data } = evt;

		const userName =
			(data.first_name && data.last_name
				? `${data.first_name} ${data.last_name}`
				: data.first_name || data.last_name) || 'User';

		await db.insert(users).values({
			clerkId: data.id,
			name: userName,
			imageUrl: data.image_url,
		});
	}

	if (evt.type === 'user.deleted') {
		const { data } = evt;

		if (!data.id) {
			return new Response('Missing user ID', { status: 400 });
		}

		const [existingUser] = await db
			.select()
			.from(users)
			.where(eq(users.clerkId, data.id));

		if (!existingUser) {
			return new Response('Missing user', { status: 400 });
		}

		if (existingUser.bannerKey) {
			const utapi = new UTApi();
			await utapi.deleteFiles(existingUser.bannerKey);
		}

		await db.delete(users).where(eq(users.clerkId, data.id));
	}

	if (evt.type === 'user.updated') {
		const { data } = evt;

		const userName =
			(data.first_name && data.last_name
				? `${data.first_name} ${data.last_name}`
				: data.first_name || data.last_name) || 'User';

		await db
			.update(users)
			.set({
				name: userName,
				imageUrl: data.image_url,
			})
			.where(eq(users.clerkId, data.id));
	}

	return new Response('Webhook received', { status: 200 });
}
