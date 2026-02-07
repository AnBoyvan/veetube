import { create } from '@/features/videos/procedures/create';
import { generateDescription } from '@/features/videos/procedures/generate-description';
import { generateThumbnail } from '@/features/videos/procedures/generate-thumbnail';
import { generateTitle } from '@/features/videos/procedures/generate-title';
import { getMany } from '@/features/videos/procedures/get-many';
import { getManySubscribed } from '@/features/videos/procedures/get-many-subscribed';
import { getManyTrending } from '@/features/videos/procedures/get-many-trending';
import { getOne } from '@/features/videos/procedures/get-one';
import { remove } from '@/features/videos/procedures/remove';
import { restoreThumbnail } from '@/features/videos/procedures/restore-thumbnail';
import { revalidate } from '@/features/videos/procedures/revalidate';
import { update } from '@/features/videos/procedures/update';
import { createTRPCRouter } from '@/trpc/init';

export const videosRouter = createTRPCRouter({
	getOne,
	getMany,
	getManyTrending,
	getManySubscribed,
	create,
	update,
	generateTitle,
	generateDescription,
	generateThumbnail,
	restoreThumbnail,
	remove,
	revalidate,
});
