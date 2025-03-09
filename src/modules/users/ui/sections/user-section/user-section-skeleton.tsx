import { Separator } from '@/components/ui/separator';

import { UserPageBannerSkeleton } from '../../components/user-page-banner-skeleton';
import { UserPageInfoSkeleton } from '../../components/user-page-info-skeleton';

export const UserSectionSkeleton = () => {
	return (
		<div className="flex flex-col">
			<UserPageBannerSkeleton />
			<UserPageInfoSkeleton />
			<Separator />
		</div>
	);
};
