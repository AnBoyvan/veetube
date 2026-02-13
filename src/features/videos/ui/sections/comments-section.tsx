import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { useSuspenseComments } from '@/features/comments/hooks/use-suspense-comments';
import { CommentForm } from '@/features/comments/ui/components/comment-form';
import { CommentItem } from '@/features/comments/ui/components/comment-item';
import { pluralize } from '@/i18n/pluralize';

interface CommentsSectionProps {
	videoId: string;
}

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
	const t = useTranslations();

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useSuspenseComments({ videoId });

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-6">
				<h1 className="font-bold text-xl">
					{data.pages[0].totalCount}
					{t(pluralize(data.pages[0].totalCount, 'comments'))}
				</h1>
				<CommentForm videoId={videoId} />
				<div className="mt-2 flex flex-col gap-4">
					{data.pages
						.flatMap(page => page.items)
						.map(comment => (
							<CommentItem key={comment.id} comment={comment} />
						))}
					<InfiniteScroll
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
						fetchNextPage={fetchNextPage}
					/>
				</div>
			</div>
		</div>
	);
};

export const CommentsSectionSkeleton = () => {
	return (
		<div className="mt-6 flex items-center justify-center">
			<Loader2Icon className="size-7 animate-spin text-muted-foreground" />
		</div>
	);
};
