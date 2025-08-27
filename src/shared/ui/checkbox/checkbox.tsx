import React from 'react';
import { CheckIcon } from 'lucide-react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	ref?: React.Ref<HTMLInputElement>;
	value?: string;
}

export const Checkbox = ({ label, ref, value, name, id, ...rest }: Props) => {
	const checkboxId = id || name || value || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<div className="flex items-center">
			<div className="relative flex cursor-pointer items-center rounded-full">
				<input
					{...rest}
					className="peer relative min-h-[18px] min-w-[18px] cursor-pointer appearance-none rounded-sm border border-gray-300 bg-gray-50 checked:border-gray-500 hover:border-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					id={checkboxId}
					name={name}
					ref={ref}
					type="checkbox"
					value={value}
				/>
				<span className="absolute top-[10px] left-[9px] flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity peer-checked:opacity-100">
					<CheckIcon className="size-4" aria-hidden="true" />
				</span>
			</div>
			{label && (
				<label
					className="ml-2 cursor-pointer text-sm text-gray-600 peer-checked:text-gray-950 hover:text-gray-950"
					htmlFor={checkboxId}
				>
					{label}
				</label>
			)}
		</div>
	);
};
