'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ClapperboardIcon, UserCircleIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export const AuthButton = () => {
	const t = useTranslations();

	return (
		<>
			<SignedIn>
				<UserButton userProfileMode="modal">
					<UserButton.MenuItems>
						<UserButton.Link
							label={t('user.my_profile')}
							href="/users/current"
							labelIcon={<UserIcon className="size-4" />}
						/>
						<UserButton.Link
							label={t('common.studio')}
							href="/studio"
							labelIcon={<ClapperboardIcon className="size-4" />}
						/>
					</UserButton.MenuItems>
				</UserButton>
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button
						variant="outline"
						className="rounded-full border-focus/20 px-4 py-2 font-medium text-focus text-sm shadow-none hover:text-focus/90"
					>
						<UserCircleIcon />
						{t('user.sign_in')}
					</Button>
				</SignInButton>
			</SignedOut>
		</>
	);
};
