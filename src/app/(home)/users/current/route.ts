import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';

export const GET = async () => {
	const { userId } = await auth();

	if (!userId) {
		return redirect('/sign-in');
	}

	const [existingUser] = await db
		.select()
		.from(users)
		.where(eq(users.clerkId, userId));

	if (!existingUser) {
		return redirect('/sign-in');
	}

	redirect(`/users/${existingUser.id}`);
};
