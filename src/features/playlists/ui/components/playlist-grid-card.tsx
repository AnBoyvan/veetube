import Link from 'next/link';

import type { PlaylistGetManyOutput } from '../../types';
import { PlaylistInfo, PlaylistInfoSkeleton } from './playlist-info';
import {
	PlaylistThumbnail,
	PlaylistThumbnailSkeleton,
} from './playlist-thumbnail';

interface PlaylistGridCardProps {
	data: PlaylistGetManyOutput['items'][number];
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
	return (
		<Link prefetch href={`/playlists/${data.id}`}>
			<div className="flex w-full flex-col gap-2">
				<PlaylistThumbnail
					imageUrl={data.thumbnailUrl}
					title={data.name}
					videoCount={data.videoCount}
				/>
				<PlaylistInfo data={data} />
			</div>
		</Link>
	);
};

export const PlaylistGridCardSkeleton = () => {
	return (
		<div className="flex w-full flex-col gap-2">
			<PlaylistThumbnailSkeleton />
			<PlaylistInfoSkeleton />
		</div>
	);
};
