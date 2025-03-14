'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThemeSwitcherProps {
	onSelect?: () => void;
}

export function ThemeSwitcher({ onSelect }: ThemeSwitcherProps) {
	const t = useTranslations('general.theme');
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">{t('label')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onSelect?.();
						setTheme('light');
					}}
				>
					{t('light')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						onSelect?.();
						setTheme('dark');
					}}
				>
					{t('dark')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						onSelect?.();
						setTheme('system');
					}}
				>
					{t('system')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
