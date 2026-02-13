import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_PLAYLISTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

interface UsePlaylistsForVideoProps {
	videoId: string;
	enabled: boolean;
}

export const usePlaylistsForVideo = ({
	videoId,
	enabled,
}: UsePlaylistsForVideoProps) => {
	const trpc = useTRPC();

	return useInfiniteQuery(
		trpc.playlists.getManyForVideo.infiniteQueryOptions(
			{
				videoId,
				limit: DEFAULT_PLAYLISTS_LIMIT,
			},
			{
				getNextPageParam: lastPage => lastPage.nextCursor,
				enabled,
			},
		),
	);
};
