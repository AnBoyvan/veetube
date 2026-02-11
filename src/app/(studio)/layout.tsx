import { StudioLayout } from '@/features/studio/ui/layouts/studio-layout';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return <StudioLayout>{children}</StudioLayout>;
}
