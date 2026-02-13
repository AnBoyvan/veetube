import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_PLAYLISTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useCreatePlaylist = () => {
	const t = useTranslations();
	const trpc = useTRPC();
	const queryClient = useQueryClient();

	return useMutation(
		trpc.playlists.create.mutationOptions({
			onSuccess: async () => {
				toast.success(t('playlist.create_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getMany.infiniteQueryKey({
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
