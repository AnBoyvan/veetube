import Link from 'next/link';

import { PlaylistGetManyOutput } from '../../types';
import { PlaylistInfo } from './playlist-info';
import { PlaylistThumbnail } from './playlist-thumbnail';

interface PlaylistGridCardProps {
	data: PlaylistGetManyOutput['items'][number];
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
	return (
		<Link prefetch href={`/playlists/${data.id}`}>
			<div className="flex flex-col gap-2 w-full">
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
