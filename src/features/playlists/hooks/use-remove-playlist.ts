import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_PLAYLISTS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useRemovePlaylist = () => {
	const t = useTranslations();
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation(
		trpc.playlists.remove.mutationOptions({
			onSuccess: async () => {
				toast.success(t('playlist.remove_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.playlists.getMany.infiniteQueryKey({
						limit: DEFAULT_PLAYLISTS_LIMIT,
					}),
				});

				router.push('/playlists');
			},
			onError: () => {
				toast.error(t('general.smth_wrong'));
			},
		}),
	);
};
