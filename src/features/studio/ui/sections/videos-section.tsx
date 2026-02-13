'use client';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { Globe2Icon, LockIcon } from 'lucide-react';
import { type TranslationKey, useLocale, useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { VideoThumbnail } from '@/features/videos/ui/components/video-thumbnail';
import { userLocale } from '@/i18n/config';
import { DEFAULT_VIDEOS_LIMIT } from '@/lib/constants';

import { useStudioVideos } from '../../hooks/use-studio-videos';

export const VideosSection = () => {
	const t = useTranslations();
	const locale = useLocale();
	const router = useRouter();

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useStudioVideos();

	return (
		<div>
			<div className="border-y">
				<Table className="w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[510px] pl-6">
								{t('common.video')}
							</TableHead>
							<TableHead>{t('common.visibility')}</TableHead>
							<TableHead>{t('common.status')}</TableHead>
							<TableHead>{t('common.date')}</TableHead>
							<TableHead className="text-right">{t('common.views')}</TableHead>
							<TableHead className="text-right">
								{t('common.comments')}
							</TableHead>
							<TableHead className="pr-6 text-right">
								{t('common.likes')}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.pages
							.flatMap(page => page.items)
							.map(video => (
								<TableRow
									className="cursor-pointer"
									key={video.id}
									onClick={() => {
										router.push(`/studio/videos/${video.id}`);
									}}
								>
									<TableCell className="max-w-[510px] overflow-hidden pl-6">
										<div className="flex items-center gap-4">
											<div className="relative aspect-video w-36 shrink-0">
												<VideoThumbnail
													imageUrl={video.thumbnailUrl}
													previewUrl={video.previewUrl}
													title={video.title}
													duration={video.duration}
												/>
											</div>
											<div className="flex min-w-0 flex-col gap-y-1">
												<span className="line-clamp-1 truncate text-sm">
													{video.title}
												</span>
												<span className="truncate text-muted-foreground text-xs">
													{video.description || t('common.no_description')}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center">
											{video.visibility === 'private' ? (
												<LockIcon className="mr-2 size-4" />
											) : (
												<Globe2Icon className="mr-2 size-4" />
											)}
											{t(`video.visibility.${video.visibility}`)}
										</div>
									</TableCell>
									<TableCell>
										<span className="flex items-center">
											{t(
												`video.statuses.${video.muxStatus ?? 'errored'}` as TranslationKey,
											)}
										</span>
									</TableCell>
									<TableCell className="truncate text-sm">
										{format(new Date(video.createdAt), 'dd-MM-yyy', {
											locale: userLocale[locale],
										})}
									</TableCell>
									<TableCell className="text-right text-sm">
										{Intl.NumberFormat(locale, {
											notation: 'compact',
										}).format(video.viewCount)}
									</TableCell>
									<TableCell className="text-right text-sm">
										{Intl.NumberFormat(locale, {
											notation: 'compact',
										}).format(video.commentCount)}
									</TableCell>
									<TableCell className="pr-6 text-right text-sm">
										{Intl.NumberFormat(locale, {
											notation: 'compact',
										}).format(video.likeCount)}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
			<InfiniteScroll
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
			/>
		</div>
	);
};

export const VideosSectionSkeleton = () => {
	const t = useTranslations();

	return (
		<div className="border-y">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[510px] pl-6">
							{t('common.video')}
						</TableHead>
						<TableHead>{t('common.visibility')}</TableHead>
						<TableHead>{t('common.status')}</TableHead>
						<TableHead>{t('common.date')}</TableHead>
						<TableHead className="text-right">{t('common.views')}</TableHead>
						<TableHead className="text-right">{t('common.comments')}</TableHead>
						<TableHead className="pr-6 text-right">
							{t('common.likes')}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: DEFAULT_VIDEOS_LIMIT }).map((_, idx) => (
						<TableRow key={idx}>
							<TableCell className="pl-6">
								<div className="flex items-center gap-4">
									<Skeleton className="h-20 w-36" />
									<div className="flex flex-col gap-2">
										<Skeleton className="h-4 w-[100px]" />
										<Skeleton className="h-3 w-[150px]" />
									</div>
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-16" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-24" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="ml-auto h-4 w-12" />
							</TableCell>
							<TableCell className="text-right">
								<Skeleton className="ml-auto h-4 w-12" />
							</TableCell>
							<TableCell className="pr-6 text-right">
								<Skeleton className="ml-auto h-4 w-12" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
