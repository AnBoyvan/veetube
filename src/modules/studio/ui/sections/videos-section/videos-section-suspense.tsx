'use client';

import Link from 'next/link';

import { format } from 'date-fns';
import { Globe2Icon, LockIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { InfiniteScroll } from '@/components/common/infinite-scroll';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DEFAULT_VIDEOS_LIMIT } from '@/constants';
import { Locale, userLocale } from '@/i18n/config';
import { VideoThumbnail } from '@/modules/videos/ui/components/video-thumbnail';
import { trpc } from '@/trpc/client';

export const VideosSectionSuspense = () => {
	const t = useTranslations();
	const locale = useLocale();

	const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_VIDEOS_LIMIT,
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor,
		},
	);

	return (
		<div>
			<div className="border-y">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6 w-[510px]">
								{t('common.video')}
							</TableHead>
							<TableHead>{t('common.visibility')}</TableHead>
							<TableHead>{t('common.status')}</TableHead>
							<TableHead>{t('common.date')}</TableHead>
							<TableHead className="text-right">{t('common.views')}</TableHead>
							<TableHead className="text-right">
								{t('common.comments')}
							</TableHead>
							<TableHead className="text-right pr-6">
								{t('common.likes')}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{videos.pages
							.flatMap(page => page.items)
							.map(video => (
								<Link
									prefetch
									href={`/studio/videos/${video.id}`}
									key={video.id}
									legacyBehavior
								>
									<TableRow className="cursor-pointer">
										<TableCell className="pl-6">
											<div className="flex items-center gap-4">
												<div className="relative aspect-video w-36 shrink-0">
													<VideoThumbnail
														imageUrl={video.thumbnailUrl}
														previewUrl={video.previewUrl}
														title={video.title}
														duration={video.duration}
													/>
												</div>
												<div className="flex flex-col overflow-hidden gap-y-1">
													<span className="text-sm line-clamp-1">
														{video.title}
													</span>
													<span className="text-xs text-muted-foreground line-clamp-1">
														{video.description || t('common.no_description')}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center">
												{video.visibility === 'private' ? (
													<LockIcon className="size-4 mr-2" />
												) : (
													<Globe2Icon className="size-4 mr-2" />
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
										<TableCell className="text-sm truncate">
											{format(new Date(video.createdAt), 'dd-MM-yyy', {
												locale: userLocale[locale as Locale],
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
										<TableCell className="text-right text-sm pr-6">
											{Intl.NumberFormat(locale, {
												notation: 'compact',
											}).format(video.likeCount)}
										</TableCell>
									</TableRow>
								</Link>
							))}
					</TableBody>
				</Table>
			</div>
			<InfiniteScroll
				hasNextPage={query.hasNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
				fetchNextPage={query.fetchNextPage}
			/>
		</div>
	);
};
