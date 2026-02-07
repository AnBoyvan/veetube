import type { HTMLInputTypeAttribute } from 'react';

import type { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/cn';

interface InputFieldProps {
	control: Control<any, any>;
	name: string;
	type?: HTMLInputTypeAttribute;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	generateAction?: React.ReactNode;
}

export const InputField = ({
	control,
	name,
	type = 'text',
	label,
	placeholder,
	disabled,
	className,
	generateAction,
}: InputFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						<div className="flex items-center gap-x-2">
							{label}
							{generateAction}
						</div>
					</FormLabel>
					<FormControl>
						<Input
							{...field}
							type={type}
							disabled={disabled}
							placeholder={placeholder}
							className={cn(className)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
