import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';

export const useUpdateVideo = () => {
	const t = useTranslations();
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	return useMutation(
		trpc.videos.update.mutationOptions({
			onSuccess: async data => {
				await queryClient.invalidateQueries(
					trpc.studio.getMany.queryOptions({ limit: DEFAULT_VIDEOS_LIMIT }),
				);
				await queryClient.invalidateQueries(
					trpc.studio.getOne.queryOptions({ id: data.id }),
				);
				toast.success(t('video.update_success'));
			},
			onError: () => {
				toast.error(t('video.update_error'));
			},
		}),
	);
};
