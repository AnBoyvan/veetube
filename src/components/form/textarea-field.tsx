import type { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils/cn';

import { Textarea } from '../ui/textarea';

interface TextareaFieldProps {
	control: Control<any, any>;
	name: string;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	generateAction?: React.ReactNode;
	cols?: number;
	rows?: number;
}

export const TextareaField = ({
	control,
	name,
	label,
	placeholder,
	disabled,
	className,
	generateAction,
	cols,
	rows,
}: TextareaFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel>
							<div className="flex items-center gap-x-2">
								{label}
								{generateAction}
							</div>
						</FormLabel>
					)}
					<FormControl>
						<Textarea
							{...field}
							value={field.value ?? ''}
							rows={rows}
							cols={cols}
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
