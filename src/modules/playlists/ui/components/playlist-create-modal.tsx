import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { trpc } from '@/trpc/client';

interface PlaylistCreateModal {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
	name: z.string().min(1),
});

export const PlaylistCreateModal = ({
	open,
	onOpenChange,
}: PlaylistCreateModal) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: '',
		},
		resolver: zodResolver(formSchema),
	});

	const create = trpc.playlists.create.useMutation({
		onSuccess: () => {
			utils.playlists.getMany.invalidate();
			toast.success(t('video.playlist_create_success'));
			form.reset();
			onOpenChange(false);
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		create.mutate(values);
	};

	return (
		<ResponsiveModal
			open={open}
			onOpenChange={onOpenChange}
			title={t('video.playlist_create_title')}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('common.title')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder={t('video.playlist_placeholder')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button type="submit" disabled={create.isPending}>
							{t('actions.create')}
						</Button>
					</div>
				</form>
			</Form>
		</ResponsiveModal>
	);
};
