import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { commentInsertSchema } from '@/db/schema';
import { UserAvatar } from '@/features/users/ui/components/user-avatar';
import { USER_FALLBACK } from '@/lib/constants';

import { useCreateComment } from '../../hooks/use-create-comment';

interface CommentFormProps {
	videoId: string;
	parentId?: string;
	onSuccess?: () => void;
	onCancel?: () => void;
	variant?: 'comment' | 'reply';
}

export const CommentForm = ({
	videoId,
	parentId,
	onSuccess,
	onCancel,
	variant = 'comment',
}: CommentFormProps) => {
	const t = useTranslations();
	const { user } = useUser();

	const create = useCreateComment();

	const form = useForm<Omit<z.infer<typeof commentInsertSchema>, 'userId'>>({
		defaultValues: {
			parentId,
			videoId,
			value: '',
		},
		resolver: zodResolver(commentInsertSchema.omit({ userId: true })),
	});

	const onSubmit = (
		values: Omit<z.infer<typeof commentInsertSchema>, 'userId'>,
	) => {
		create.mutate(values, {
			onSuccess: () => {
				form.reset();
				onSuccess?.();
			},
		});
	};

	const handleCancel = () => {
		form.reset();
		onCancel?.();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="group flex gap-4">
				<UserAvatar
					size="lg"
					imageUrl={user?.imageUrl || USER_FALLBACK}
					name={user?.username || 'User'}
				/>
				<div className="flex-1">
					<TextareaField
						name="value"
						control={form.control}
						placeholder={t(
							variant === 'reply'
								? 'comment.reply_placeholder'
								: 'comment.comment_placeholder',
						)}
						className="min-h-0 resize-none overflow-hidden bg-transparent"
					/>
					<div className="mt-2 flex justify-end gap-2">
						{onCancel && (
							<Button type="button" variant="ghost" onClick={handleCancel}>
								{t('actions.cancel')}
							</Button>
						)}
						<Button
							type="submit"
							disabled={
								create.isPending ||
								!form.formState.isDirty ||
								!form.formState.isValid
							}
						>
							{t(variant === 'reply' ? 'actions.reply' : 'actions.comment')}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
