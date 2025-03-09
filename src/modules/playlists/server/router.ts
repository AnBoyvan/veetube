import { createTRPCRouter } from '@/trpc/init';

import { addVideo } from './procedures/add-video';
import { create } from './procedures/create';
import { getHistory } from './procedures/get-history';
import { getLiked } from './procedures/get-liked';
import { getMany } from './procedures/get-many';
import { getManyForVideo } from './procedures/get-many-for-video';
import { getOne } from './procedures/get-one';
import { getVideos } from './procedures/get-videos';
import { remove } from './procedures/remove';
import { removeVideo } from './procedures/remove-video';

export const playlistsRouter = createTRPCRouter({
	create,
	getHistory,
	getLiked,
	getMany,
	getManyForVideo,
	getOne,
	remove,
	addVideo,
	removeVideo,
	getVideos,
});
