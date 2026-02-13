import { useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import { Edit2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

import type { UsersGetOneOutput } from '../../types';
import { BannerUploadModal } from './banner-upload-modal';

interface UserPageBannerProps {
	user: UsersGetOneOutput;
}

export const UserPageBanner = ({ user }: UserPageBannerProps) => {
	const { userId: clerkUserId } = useAuth();

	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

	return (
		<div className="group relative">
			<BannerUploadModal
				userId={user.id}
				open={isBannerModalOpen}
				onOpenChange={setIsBannerModalOpen}
			/>
			<div
				style={{
					backgroundImage: user.bannerUrl
						? `url(${user.bannerUrl})`
						: undefined,
				}}
				className={cn(
					'h-[15vh] max-h-200px w-full rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 md:h-[25vh] dark:from-gray-900 dark:to-gray-800',
					user.bannerUrl && 'bg-center bg-cover',
				)}
			>
				{user.clerkId === clerkUserId && (
					<Button
						type="button"
						size="icon"
						onClick={() => setIsBannerModalOpen(true)}
						className="absolute top-4 right-4 rounded-full bg-foreground/50 opacity-100 transition-opacity duration-300 hover:bg-foreground/50 group-hover:opacity-100 md:opacity-0"
					>
						<Edit2Icon className="text-white dark:text-black" />
					</Button>
				)}
			</div>
		</div>
	);
};

export const UserPageBannerSkeleton = () => {
	return (
		<Skeleton className="h-[15vh] max-h-200px w-full rounded-xl md:h-[25vh]" />
	);
};
