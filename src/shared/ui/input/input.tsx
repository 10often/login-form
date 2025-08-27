import React, { memo } from 'react';
import clsx from 'clsx';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	isError?: boolean;
	label?: string;
	name: string;
	size?: 'small' | 'medium' | 'large';
	wrapperClassName?: string;
	ref: React.Ref<HTMLInputElement>;
	renderHelperSlot?: (id: string) => React.ReactNode;
	headAdornment?: React.ReactNode;
	tailAdornment?: React.ReactNode;
}

export const Input = memo(
	({
		isError,
		label,
		name,
		size = 'medium',
		wrapperClassName,
		ref,
		renderHelperSlot,
		headAdornment,
		tailAdornment,
		...props
	}: Props) => {
		return (
			<div className={clsx('relative', wrapperClassName)}>
				<label
					htmlFor={`${name}-id`}
					className={clsx(
						'block cursor-pointer pb-2 text-left text-sm font-medium text-gray-700',
						isError && 'text-red-500'
					)}
				>
					{label}
				</label>
				<span className="relative flex w-full">
					{headAdornment && <span className="absolute top-1/2 left-3 -translate-y-1/2 transform">{headAdornment}</span>}
					<input
						id={`${name}-id`}
						aria-describedby={`${name}-helper-text`}
						aria-invalid={isError}
						aria-required={props.required}
						className={clsx(
							'w-full rounded-md border border-gray-300 bg-white hover:border-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
							size === 'small' && 'px-2 py-1 text-sm',
							size === 'medium' && 'px-3 py-2 text-base',
							size === 'large' && 'px-4 py-3 text-lg',
							isError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
							headAdornment ? 'pl-10' : '',
							tailAdornment ? 'pr-10' : ''
						)}
						name={name}
						ref={ref}
						{...props}
					/>
					{tailAdornment && (
						<span className="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center">
							{tailAdornment}
						</span>
					)}
				</span>
				{renderHelperSlot && renderHelperSlot(`${name}-helper-text`)}
			</div>
		);
	}
);
