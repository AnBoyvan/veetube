import { inferRouterOutputs } from '@trpc/server';

import { AppRouter } from '@/trpc/routers/_app';

export type PlaylistGetManyOutput =
	inferRouterOutputs<AppRouter>['playlists']['getMany'];

export type PlaylistGetOneOutput =
	inferRouterOutputs<AppRouter>['playlists']['getOne'];
