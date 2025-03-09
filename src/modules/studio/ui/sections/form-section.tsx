'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	CopyCheckIcon,
	CopyIcon,
	Globe2Icon,
	ImagePlusIcon,
	Loader2Icon,
	LockIcon,
	MoreVerticalIcon,
	RotateCcwIcon,
	SparklesIcon,
	TrashIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { APP_URL, THUMBNAIL_FALLBACK } from '@/constants';
import { videoUpdateSchema } from '@/db/schema';
import { getTranslated } from '@/i18n/get-translated';
import { VideoPlayer } from '@/modules/videos/ui/components/video-player';
import { trpc } from '@/trpc/client';

import { ThumbnailGenerateModal } from '../components/thumbnail-generate-modal';
import { ThumbnailUploadModal } from '../components/thumbnail-upload-modal';

interface FormSectionProps {
	videoId: string;
}

export const FormSection = (props: FormSectionProps) => {
	return (
		<Suspense fallback={<FormSectionSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<FormSectionSuspense {...props} />
			</ErrorBoundary>
		</Suspense>
	);
};

const FormSectionSkeleton = () => {
	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div className="space-y-2">
					<Skeleton className="h-7 w-32" />
					<Skeleton className="h-4 w-40" />
				</div>
				<Skeleton className="h-9 w-24" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				<div className="space-y-8 lg:col-span-3">
					<div className="space-y-2">
						<Skeleton className="h-5 w-16" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-[220px] w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-[84px] w-[153px]" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
				<div className="flex flex-col gap-y-8 lg:col-span-2">
					<div className="flex flex-col gap-4 bg-border rounded-xl overflow-hidden">
						<Skeleton className="aspect-video" />
						<div className="p-4 space-y-6">
							<div className="space-y-2">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-5 w-full" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-32" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-5 w-32" />
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</div>
		</div>
	);
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
	const t = useTranslations();
	const router = useRouter();
	const utils = trpc.useUtils();

	const [isCopied, setIsCopied] = useState(false);
	const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

	const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const update = trpc.videos.update.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: video.id });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});

	const revalidate = trpc.videos.revalidate.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: video.id });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});

	const remove = trpc.videos.remove.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			toast.success(t('video.remove_success'));
			router.push('/studio');
		},
		onError: () => {
			toast.error(t('video.remove_error'));
		},
	});

	const generateTitle = trpc.videos.generateTitle.useMutation({
		onSuccess: () => {
			toast.success(t('common.bg_job_started'), {
				description: t('common.take_time'),
			});
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const generateDescription = trpc.videos.generateDescription.useMutation({
		onSuccess: () => {
			toast.success(t('common.bg_job_started'), {
				description: t('common.take_time'),
			});
		},
		onError: () => {
			toast.error(t('general.smth_wrong'));
		},
	});

	const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			utils.studio.getOne.invalidate({ id: video.id });
			toast.success(t('video.update_success'));
		},
		onError: () => {
			toast.error(t('video.update_error'));
		},
	});

	const form = useForm<z.infer<typeof videoUpdateSchema>>({
		defaultValues: video,
		resolver: zodResolver(videoUpdateSchema),
	});

	const onSubmit = (data: z.infer<typeof videoUpdateSchema>) => {
		update.mutate(data);
	};

	const fullUrl = `${APP_URL}/videos/${video.id}`;

	const onCopy = async () => {
		await navigator.clipboard.writeText(fullUrl);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<>
			<ThumbnailUploadModal
				open={isThumbnailModalOpen}
				onOpenChange={setIsThumbnailModalOpen}
				videoId={video.id}
			/>
			<ThumbnailGenerateModal
				open={isGenerateModalOpen}
				onOpenChange={setIsGenerateModalOpen}
				videoId={video.id}
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl font-bold">{t('video.details')}</h1>
							<p className="text-xs text-muted-foreground">
								{t('video.details_manage')}
							</p>
						</div>
						<div className="flex items-center gap-x-2">
							<Button
								type="submit"
								disabled={update.isPending || !form.formState.isDirty}
							>
								{t('actions.save')}
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreVerticalIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => revalidate.mutate({ id: video.id })}
									>
										<RotateCcwIcon className="size-4 mr-2" />
										{t('actions.revalidate')}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => remove.mutate({ id: video.id })}
									>
										<TrashIcon className="size-4 mr-2" />
										{t('actions.delete')}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
						<div className="space-y-8 lg:col-span-3">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<div className="flex items-center gap-x-2">
												{t('common.title')}
												<Button
													type="button"
													size="icon"
													variant="outline"
													disabled={
														generateTitle.isPending || !video.muxTrackId
													}
													onClick={() => generateTitle.mutate({ id: video.id })}
													className="rounded-full size-6 [&_svg]:size-3"
												>
													{generateTitle.isPending ? (
														<Loader2Icon className="animate-spin" />
													) : (
														<SparklesIcon />
													)}
												</Button>
											</div>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={t('video.title_placeholder')}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<div className="flex items-center gap-x-2">
												{t('common.description')}
												<Button
													type="button"
													size="icon"
													variant="outline"
													disabled={
														generateDescription.isPending || !video.muxTrackId
													}
													onClick={() =>
														generateDescription.mutate({ id: video.id })
													}
													className="rounded-full size-6 [&_svg]:size-3"
												>
													{generateDescription.isPending ? (
														<Loader2Icon className="animate-spin" />
													) : (
														<SparklesIcon />
													)}
												</Button>
											</div>
										</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												value={field.value ?? ''}
												rows={10}
												placeholder={t('video.description_placeholder')}
												className="resize-none pr-10"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="thumbnailUrl"
								render={() => (
									<FormItem>
										<FormLabel>{t('common.thumbnail')}</FormLabel>
										<FormControl>
											<div className="p-0.5 border border-secondary relative h-[84px] w-[153px] group">
												<Image
													src={video.thumbnailUrl || THUMBNAIL_FALLBACK}
													fill
													alt={t('common.thumbnail')}
													className="object-cover"
												/>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															type="button"
															size="icon"
															className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 lg:opacity-0 group-hover:opacity-100 duration-300 size-7"
														>
															<MoreVerticalIcon className="text-white" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="start" side="right">
														<DropdownMenuItem
															onClick={() => setIsThumbnailModalOpen(true)}
														>
															<ImagePlusIcon className="size-4 mr-1" />
															{t('actions.change')}
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => setIsGenerateModalOpen(true)}
														>
															<SparklesIcon className="size-4 mr-1" />
															{t('common.ai_generated')}
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																restoreThumbnail.mutate({ id: video.id })
															}
														>
															<RotateCcwIcon className="size-4 mr-1" />
															{t('actions.restore')}
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('common.category')}</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={t('video.category_placeholder')}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map(category => (
													<SelectItem key={category.id} value={category.id}>
														{getTranslated(t, category.name)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-y-8 lg:col-span-2">
							<div className="flex flex-col gap-4 bg-border rounded-xl overflow-hidden h-fit">
								<div className="aspect-video overflow-hidden relative">
									<VideoPlayer
										playbackId={video.muxPlaybackId}
										thumbnailUrl={video.thumbnailUrl}
									/>
								</div>
								<div className="p-4 flex flex-col gap-y-6">
									<div className="flex items-center justify-between gap-x-2">
										<div className="flex flex-col gap-y-1 w-full">
											<p className="text-xs text-muted-foreground">
												{t('video.link')}
											</p>
											<div className="flex items-center gap-x-2 w-full">
												<Link
													prefetch
													href={`/videos/${video.id}`}
													className="overflow-hidden"
												>
													<p className="line-clamp-1 text-sm text-focus">
														{fullUrl}
													</p>
												</Link>
												<Button
													type="button"
													size="icon"
													variant="ghost"
													disabled={isCopied}
													onClick={onCopy}
													className="shrink-0"
												>
													{isCopied ? <CopyCheckIcon /> : <CopyIcon />}
												</Button>
											</div>
										</div>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex flex-col gap-y-1">
											<p className="text-xs text-muted-foreground">
												{t('video.status')}
											</p>
											<p className="text-sm">
												{t(
													`video.statuses.${video.muxStatus ?? 'preparing'}` as TranslationKey,
												)}
											</p>
										</div>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex flex-col gap-y-1">
											<p className="text-xs text-muted-foreground">
												{t('video.subtitles_status')}
											</p>
											<p className="text-sm">
												{t(
													`video.statuses.${video.muxTrackStatus ?? 'none'}` as TranslationKey,
												)}
											</p>
										</div>
									</div>
								</div>
							</div>
							<FormField
								control={form.control}
								name="visibility"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('common.visibility')}</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value ?? undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={t('video.visibility_placeholder')}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="public">
													<div className="flex items-center">
														<Globe2Icon className="size-4 mr-2" />
														{t('video.visibility.public')}
													</div>
												</SelectItem>
												<SelectItem value="private">
													<div className="flex items-center">
														<LockIcon className="size-4 mr-2" />
														{t('video.visibility.private')}
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
