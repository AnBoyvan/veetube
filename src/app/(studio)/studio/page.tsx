import { StudioView } from '@/features/studio/ui/views/studio-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

const StudioPage = async () => {
	prefetch(
		trpc.studio.getMany.infiniteQueryOptions(
			{
				limit: DEFAULT_VIDEOS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
			},
		),
	);

	return (
		<HydrateClient>
			<StudioView />
		</HydrateClient>
	);
};

export default StudioPage;
