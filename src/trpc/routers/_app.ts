import { categoriesRouter } from '@/modules/categories/server/router';
import { commentReactionsRouter } from '@/modules/comment-reactions/server/router';
import { commentsRouter } from '@/modules/comments/server/router';
import { playlistsRouter } from '@/modules/playlists/server/router';
import { searchRouter } from '@/modules/search/server/router';
import { studioRouter } from '@/modules/studio/server/router';
import { subscriptionsRouter } from '@/modules/subscriptions/server/router';
import { suggestionsRouter } from '@/modules/suggestions/server/router';
import { usersRouter } from '@/modules/users/server/router';
import { videoReactionsRouter } from '@/modules/video-reactions/server/router';
import { videoViewsRouter } from '@/modules/video-views/server/router';
import { videosRouter } from '@/modules/videos/server/router';

import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
	studio: studioRouter,
	categories: categoriesRouter,
	videos: videosRouter,
	videoViews: videoViewsRouter,
	videoReactions: videoReactionsRouter,
	subscriptions: subscriptionsRouter,
	comments: commentsRouter,
	commentReactions: commentReactionsRouter,
	suggestions: suggestionsRouter,
	search: searchRouter,
	playlists: playlistsRouter,
	users: usersRouter,
});

export type AppRouter = typeof appRouter;
