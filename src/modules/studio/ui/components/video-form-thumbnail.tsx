import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { THUMBNAIL_FALLBACK } from '@/constants';

import { ThumbnailMenu } from './thumbnail-menu';

interface VideoFormThumbnailProps {
	control: Control<any, any>;
	name: string;
	videoId: string;
	thumbnailUrl: string | null;
}

export const VideoFormThumbnail = ({
	control,
	name,
	videoId,
	thumbnailUrl,
}: VideoFormThumbnailProps) => {
	const t = useTranslations();

	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem>
					<FormLabel>{t('common.thumbnail')}</FormLabel>
					<FormControl>
						<div className="p-0.5 border border-secondary relative h-[84px] w-[153px] group">
							<Image
								src={thumbnailUrl || THUMBNAIL_FALLBACK}
								fill
								sizes="153px"
								alt={t('common.thumbnail')}
								className="object-cover"
							/>
							<ThumbnailMenu videoId={videoId} />
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};
