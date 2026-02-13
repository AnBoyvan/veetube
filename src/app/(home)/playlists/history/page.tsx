import { HistoryView } from '@/features/playlists/ui/views/history-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const HistoryPage = async () => {
	prefetch(
		trpc.playlists.getHistory.infiniteQueryOptions({
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<HistoryView />
		</HydrateClient>
	);
};

export default HistoryPage;
