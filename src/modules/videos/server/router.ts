import { createTRPCRouter } from '@/trpc/init';

import { create } from './procedures/create';
import { generateDescription } from './procedures/generate-description';
import { generateThumbnail } from './procedures/generate-thumbnail';
import { generateTitle } from './procedures/generate-title';
import { getMany } from './procedures/get-many';
import { getManySubscribed } from './procedures/get-many-subscribed';
import { getManyTrending } from './procedures/get-many-trending';
import { getOne } from './procedures/get-one';
import { remove } from './procedures/remove';
import { restoreThumbnail } from './procedures/restore-thumbnail';
import { revalidate } from './procedures/revalidate';
import { update } from './procedures/update';

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
