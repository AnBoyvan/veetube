import { addVideo } from '@/features/playlists/procedures/add-video';
import { create } from '@/features/playlists/procedures/create';
import { getHistory } from '@/features/playlists/procedures/get-history';
import { getLiked } from '@/features/playlists/procedures/get-liked';
import { getMany } from '@/features/playlists/procedures/get-many';
import { getManyForVideo } from '@/features/playlists/procedures/get-many-for-video';
import { getOne } from '@/features/playlists/procedures/get-one';
import { getVideos } from '@/features/playlists/procedures/get-videos';
import { remove } from '@/features/playlists/procedures/remove';
import { removeVideo } from '@/features/playlists/procedures/remove-video';
import { update } from '@/features/playlists/procedures/update';
import { createTRPCRouter } from '@/trpc/init';

export const playlistsRouter = createTRPCRouter({
	create,
	getHistory,
	getLiked,
	getMany,
	getManyForVideo,
	getOne,
	update,
	remove,
	addVideo,
	removeVideo,
	getVideos,
});
