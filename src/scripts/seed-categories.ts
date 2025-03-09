import { db } from '@/db';
import { categories } from '@/db/schema';

const categoryNames = [
	'Music',
	'Entertainment',
	'Education',
	'Science & Technology',
	'Gaming',
	'Sports',
	'News & Politics',
	'Howto & Style',
	'Film & Animation',
	'People & Blogs',
	'Comedy',
	'Travel & Events',
	'Autos & Vehicles',
	'Pets & Animals',
	'Health',
	'Business',
	'Food',
	'Fashion',
	'History',
	'Documentary',
	'Motivational',
	'Reviews',
	'Interviews',
	'Family',
	'Vlogs',
	'Football',
	'Challenges',
	'Crafts & DIY',
	'Paranormal',
	'Finance',
];

async function main() {
	console.log('Seeding categories...');

	try {
		const values = categoryNames.map(name => ({
			name,
			description: `Videos related to ${name.toLowerCase()}`,
		}));

		await db.insert(categories).values(values);

		console.log('Categories seeded successfully!');
	} catch (error) {
		console.error('Error seeding categories', error);
		process.exit(1);
	}
}

main();
