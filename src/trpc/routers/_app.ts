import { createTRPCRouter } from '../init';
import { categoriesRouter } from './categories';
import { commentReactionsRouter } from './comment-reactions';
import { commentsRouter } from './comments';
import { playlistsRouter } from './playlists';
import { searchRouter } from './search';
import { studioRouter } from './studio';
import { subscriptionsRouter } from './subscriptions';
import { suggestionsRouter } from './suggestions';
import { usersRouter } from './users';
import { videoReactionsRouter } from './video-reactions';
import { videoViewsRouter } from './video-views';
import { videosRouter } from './videos';

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
