import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { HistoryView } from '@/modules/playlists/ui/views/history-view';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

const Page = async () => {
	void trpc.playlists.getHistory.prefetchInfinite({
		limit: DEFAULT_VIDEOS_LIMIT,
	});

	return (
		<HydrateClient>
			<HistoryView />
		</HydrateClient>
	);
};

export default Page;
