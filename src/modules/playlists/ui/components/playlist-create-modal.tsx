import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { InputField } from '@/components/form/input-field';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { trpc } from '@/trpc/client';

interface PlaylistCreateModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string().nullish(),
});

export const PlaylistCreateModal = ({
	open,
	onOpenChange,
}: PlaylistCreateModalProps) => {
	const t = useTranslations();
	const utils = trpc.useUtils();

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: '',
			description: '',
		},
		resolver: zodResolver(formSchema),
	});

	const create = trpc.playlists.create.useMutation({
		onSuccess: () => {
			utils.playlists.getMany.invalidate();
			toast.success(t('playlist.create_success'));
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
			title={t('playlist.create_title')}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<InputField
						control={form.control}
						name="name"
						label={t('common.title')}
						placeholder={t('playlist.name_placeholder')}
					/>
					<TextareaField
						control={form.control}
						name="description"
						label={t('common.description')}
						className="resize-none"
						placeholder={t('playlist.description_placeholder')}
						rows={5}
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
