import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingSkeleton = () => {
	return (
		<>
			{Array.from({ length: 5 }).map((_, idx) => (
				<SidebarMenuItem key={idx}>
					<SidebarMenuButton disabled>
						<Skeleton className="size-6 shrink-0 rounded-full" />
						<Skeleton className="h-4 w-full" />
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</>
	);
};
