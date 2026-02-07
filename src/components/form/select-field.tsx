import type { Control } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface SelectFieldProps {
	control: Control<any, any>;
	name: string;
	label: string;
	placeholder?: string;
	disabled?: boolean;
	children: React.ReactNode;
}

export const SelectField = ({
	control,
	name,
	label,
	placeholder,
	disabled,
	children,
}: SelectFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<Select
						disabled={disabled}
						onValueChange={field.onChange}
						defaultValue={field.value ?? undefined}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>{children}</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
