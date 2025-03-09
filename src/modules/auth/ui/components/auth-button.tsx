'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ClapperboardIcon, UserCircleIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const AuthButton = () => {
	const t = useTranslations();
	const { theme } = useTheme();

	return (
		<>
			<SignedIn>
				<UserButton
					userProfileMode="modal"
					appearance={{
						baseTheme: theme === 'dark' ? dark : undefined,
					}}
				>
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
				<SignInButton
					mode="modal"
					appearance={{
						baseTheme: theme === 'dark' ? dark : undefined,
					}}
				>
					<Button
						variant="outline"
						className="px-4 py-2 text-sm font-medium text-focus hover:text-focus/90 border-focus/20 rounded-full shadow-none"
					>
						<UserCircleIcon />
						{t('auth.sign_in')}
					</Button>
				</SignInButton>
			</SignedOut>
		</>
	);
};
