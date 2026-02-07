interface UserIdPageProps {
	params: Promise<{ userId: string }>;
}

const UserIdPage = async ({ params }: UserIdPageProps) => {
	const { userId } = await params;

	return <div>UserIdPage</div>;
};

export default UserIdPage;
