import { UserView } from '@/features/users/ui/views/user-view';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface UserIdPageProps {
	params: Promise<{ userId: string }>;
}

const UserIdPage = async ({ params }: UserIdPageProps) => {
	const { userId } = await params;

	prefetch(trpc.users.getOne.queryOptions({ id: userId }));
	prefetch(
		trpc.videos.getMany.infiniteQueryOptions({
			userId,
			limit: DEFAULT_VIDEOS_LIMIT,
		}),
	);

	return (
		<HydrateClient>
			<UserView userId={userId} />
		</HydrateClient>
	);
};

export default UserIdPage;
