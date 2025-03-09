import { useState } from 'react';

import { useAuth } from '@clerk/nextjs';
import { Edit2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { UsersGetOneOutput } from '../../types';
import { BannerUploadModal } from './banner-upload-modal';

interface UserPageBannerProps {
	user: UsersGetOneOutput;
}

export const UserPageBanner = ({ user }: UserPageBannerProps) => {
	const { userId: clerkUserId } = useAuth();

	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

	return (
		<div className="relative group">
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
					'w-full max-h-200px h-[15vh] md:h-[25vh] bg-gradient-to-r from-gray-100 dark:from-gray-900 to-gray-200 dark:to-gray-800 rounded-xl',
					user.bannerUrl && 'bg-cover bg-center',
				)}
			>
				{user.clerkId === clerkUserId && (
					<Button
						type="button"
						size="icon"
						onClick={() => setIsBannerModalOpen(true)}
						className="absolute top-4 right-4 rounded-full bg-foreground/50 hover:bg-foreground/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					>
						<Edit2Icon className="text-white dark:text-black" />
					</Button>
				)}
			</div>
		</div>
	);
};
