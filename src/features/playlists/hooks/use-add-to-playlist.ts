import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_PLAYLISTS_LIMIT, DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useAddToPlaylist = () => {
	const t = useTranslations();
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.playlists.addVideo.mutationOptions({
			onSuccess: async data => {
				toast.success(t('video.video_added'));

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getOne.queryKey({
						id: data.playlistId,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getVideos.infiniteQueryKey({
						playlistId: data.playlistId,
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getMany.infiniteQueryKey({
						limit: DEFAULT_PLAYLISTS_LIMIT,
					}),
				});

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getManyForVideo.infiniteQueryKey({
						videoId: data.videoId,
						limit: DEFAULT_PLAYLISTS_LIMIT,
					}),
				});
			},
			onError: () => {
				toast.error(t('general.smth_wrong'));
			},
		}),
	);
};
