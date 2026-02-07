import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ResponsiveModal } from '@/components/common/responsive-modal';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

export const useConfirm = (
	title: string,
	message?: string,
): [() => React.JSX.Element, () => Promise<unknown>] => {
	const t = useTranslations();

	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void;
	} | null>(null);

	const confirm = () =>
		new Promise(resolve => {
			setPromise({ resolve });
		});

	const handleClose = () => setPromise(null);

	const handleCancel = () => {
		promise?.resolve(false);
		setPromise(null);
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		setPromise(null);
	};

	const ConfirmDialog = () => (
		<ResponsiveModal
			open={promise !== null}
			onOpenChange={handleClose}
			title={title}
		>
			<div className="flex flex-col">
				{message ?? (
					<p className="mb-4 text-muted-foreground text-sm">{message}</p>
				)}
				<DialogFooter className="gap-y-2">
					<Button type="button" variant="ghost" onClick={handleCancel}>
						{t('actions.cancel')}
					</Button>
					<Button type="button" onClick={handleConfirm}>
						{t('actions.confirm')}
					</Button>
				</DialogFooter>
			</div>
		</ResponsiveModal>
	);

	return [ConfirmDialog, confirm];
};
