import MuxUploader, {
	MuxUploaderDrop,
	MuxUploaderFileSelect,
	MuxUploaderProgress,
	MuxUploaderStatus,
} from '@mux/mux-uploader-react';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface StudioUploaderProps {
	endpoint?: string | null;
	onSuccess: () => void;
}

const UPLOADER_ID = 'video-uploader';

export const StudioUploader = ({
	endpoint,
	onSuccess,
}: StudioUploaderProps) => {
	const t = useTranslations();

	return (
		<div>
			<MuxUploader
				endpoint={endpoint}
				id={UPLOADER_ID}
				className="group/uploader hidden"
				onSuccess={onSuccess}
			/>
			<MuxUploaderDrop muxUploader={UPLOADER_ID} className="group/drop">
				<div slot="heading" className="flex flex-col items-center gap-6">
					<div className="flex h-32 w-32 items-center justify-center gap-2 rounded-full bg-muted">
						<UploadIcon className="size-10 text-muted-foreground transition-all duration-300 group/drop-[&[active]]:animate-bounce" />
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="text-sm">{t('video.drag_to_upload')}</p>
						<p className="text-muted-foreground text-xs">
							{t('video.remain_private')}
						</p>
					</div>
					<MuxUploaderFileSelect muxUploader={UPLOADER_ID}>
						<Button type="button" className="rounded-full">
							{t('actions.select_files')}
						</Button>
					</MuxUploaderFileSelect>
				</div>
				<span slot="separator" className="hidden" />
				<MuxUploaderStatus muxUploader={UPLOADER_ID} className="text-sm" />
				<MuxUploaderProgress
					muxUploader={UPLOADER_ID}
					type="percentage"
					className="text-sm"
				/>
				<MuxUploaderProgress
					muxUploader={UPLOADER_ID}
					type="bar"
					className="text-sm [--progress-bar-fill-color:#EC003F]"
				/>
			</MuxUploaderDrop>
		</div>
	);
};
