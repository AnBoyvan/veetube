'use client';

import { Separator } from '@/components/ui/separator';
import { trpc } from '@/trpc/client';

import { UserPageBanner } from '../../components/user-page-banner';
import { UserPageInfo } from '../../components/user-page-info';

interface UserSectionSuspenseProps {
	userId: string;
}

export const UserSectionSuspense = ({ userId }: UserSectionSuspenseProps) => {
	const [user] = trpc.users.getOne.useSuspenseQuery({
		id: userId,
	});

	return (
		<div className="flex flex-col">
			<UserPageBanner user={user} />
			<UserPageInfo user={user} />
			<Separator />
		</div>
	);
};
