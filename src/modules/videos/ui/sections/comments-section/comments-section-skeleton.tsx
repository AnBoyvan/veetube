import { Loader2Icon } from 'lucide-react';

export const CommentsSectionSkeleton = () => {
	return (
		<div className="mt-6 flex justify-center items-center">
			<Loader2Icon className="animate-spin size-7 text-muted-foreground" />
		</div>
	);
};
