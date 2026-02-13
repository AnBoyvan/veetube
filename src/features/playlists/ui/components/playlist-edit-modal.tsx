import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { InputField } from '@/components/form/input-field';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useUpdatePlaylist } from '../../hooks/use-update-playlist';
import type { PlaylistGetOneOutput } from '../../types';

interface PlaylistEditModalProps {
	playlist: PlaylistGetOneOutput;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
	name: z.string().min(1),
	description: z.string().nullish(),
});

export const PlaylistEditModal = ({
	playlist,
	open,
	onOpenChange,
}: PlaylistEditModalProps) => {
	const t = useTranslations();

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: playlist.name,
			description: playlist.description,
		},
		resolver: zodResolver(formSchema),
	});

	const update = useUpdatePlaylist();

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		update.mutate(
			{
				id: playlist.id,
				...values,
			},
			{
				onSuccess: () => {
					onOpenChange(false);
					form.reset();
				},
			},
		);
	};

	const onCancel = () => {
		onOpenChange(false);
		form.reset();
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
						<Button
							type="button"
							variant="ghost"
							disabled={update.isPending}
							onClick={onCancel}
						>
							{t('actions.cancel')}
						</Button>
						<Button type="submit" disabled={update.isPending}>
							{t('actions.save')}
						</Button>
					</div>
				</form>
			</Form>
		</ResponsiveModal>
	);
};
