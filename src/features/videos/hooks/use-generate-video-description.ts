import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useTRPC } from '@/trpc/client';

export const useGenerateVideoDescription = () => {
	const t = useTranslations();
	const trpc = useTRPC();

	return useMutation(
		trpc.videos.generateDescription.mutationOptions({
			onSuccess: async () => {
				toast.success(t('common.bg_job_started'), {
					description: t('common.take_time'),
				});
			},
			onError: () => {
				toast.error(t('general.smth_wrong'));
			},
		}),
	);
};
