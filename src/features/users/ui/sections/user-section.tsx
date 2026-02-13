'use client';

import { Separator } from '@/components/ui/separator';

import { useUserById } from '../../hooks/use-user-by-id';
import {
	UserPageBanner,
	UserPageBannerSkeleton,
} from '../components/user-page-banner';
import {
	UserPageInfo,
	UserPageInfoSkeleton,
} from '../components/user-page-info';

interface UserSectionProps {
	userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
	const { data } = useUserById(userId);

	return (
		<div className="flex flex-col">
			<UserPageBanner user={data} />
			<UserPageInfo user={data} />
			<Separator />
		</div>
	);
};

export const UserSectionSkeleton = () => {
	return (
		<div className="flex flex-col">
			<UserPageBannerSkeleton />
			<UserPageInfoSkeleton />
			<Separator />
		</div>
	);
};
