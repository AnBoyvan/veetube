import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useRemoveVideo = () => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const router = useRouter();

	return useMutation(
		trpc.videos.remove.mutationOptions({
			onSuccess: async () => {
				toast.success(t('video.remove_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.studio.getMany.infiniteQueryKey({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});

				router.push('/studio');
			},
			onError: () => {
				toast.error(t('video.remove_error'));
			},
		}),
	);
};
