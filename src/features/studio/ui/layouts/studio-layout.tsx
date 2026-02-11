import { SidebarProvider } from '@/components/ui/sidebar';

import { StudioNavbar } from '../components/studio-navbar';
import { StudioSidebar } from '../components/studio-sidebar';

interface StudioLayoutProps {
	children: React.ReactNode;
}

export const StudioLayout = ({ children }: StudioLayoutProps) => {
	return (
		<SidebarProvider>
			<div className="w-full overflow-hidden">
				<StudioNavbar />
				<div className="flex h-screen overflow-hidden pt-[4rem]">
					<StudioSidebar />
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
};
