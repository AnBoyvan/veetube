import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useCreateVideo = () => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.videos.create.mutationOptions({
			onSuccess: async () => {
				toast.success(t('video.create_success'));

				await queryClient.invalidateQueries({
					queryKey: trpc.studio.getMany.queryKey({
						limit: DEFAULT_VIDEOS_LIMIT,
					}),
				});
			},
			onError: () => {
				toast.error(t('general.smth_wrong'));
			},
		}),
	);
};
