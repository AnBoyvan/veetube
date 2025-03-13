import { useClerk, useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { UserAvatar } from '@/components/common/user-avatar';
import { TextareaField } from '@/components/form/textarea-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { USER_FALLBACK } from '@/constants';
import { commentInsertSchema } from '@/db/schema';
import { trpc } from '@/trpc/client';

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
	const clerk = useClerk();
	const utils = trpc.useUtils();

	const create = trpc.comments.create.useMutation({
		onSuccess: () => {
			utils.comments.getMany.invalidate({ videoId });
			if (parentId) {
				utils.comments.getMany.invalidate({ videoId, parentId });
			}
			form.reset();
			toast.success(t('comment.add_success'));
			onSuccess?.();
		},
		onError: error => {
			if (error.data?.code === 'UNAUTHORIZED') {
				clerk.openSignIn();
			}
		},
	});

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
		create.mutate(values);
	};

	const handleCancel = () => {
		form.reset();
		onCancel?.();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 group">
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
						className="resize-none bg-transparent overflow-hidden min-h-0"
					/>
					<div className="flex justify-end gap-2 mt-2">
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
