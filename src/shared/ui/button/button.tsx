import React, { memo } from 'react';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = memo(
	({
		children,
		className = '',
		disabled = false,
		loading = false,
		size = 'medium',
		variant = 'primary',
		type = 'button',
		...props
	}: Props) => {
		return (
			<button
				className={clsx(
					'relative inline-flex cursor-pointer items-center justify-center rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					size === 'small' && 'px-2 py-1 text-sm',
					size === 'medium' && 'px-4 py-2 text-base',
					size === 'large' && 'px-6 py-3 text-lg',
					variant === 'primary' && 'bg-gray-800 text-white not-disabled:hover:bg-gray-950 focus:ring-gray-500',
					variant === 'secondary' &&
						'border border-gray-300 text-gray-900 not-disabled:hover:bg-gray-100 focus:ring-gray-300',
					variant === 'danger' && 'bg-red-600 text-white not-disabled:hover:bg-red-700 focus:ring-red-500',
					className
				)}
				disabled={disabled || loading}
				type={type}
				aria-disabled={disabled || loading}
				{...props}
			>
				{loading && (
					<span
						aria-live="polite"
						aria-label="Loading"
						className={clsx(
							'absolute inset-1/2 mr-2 inline-block h-4 w-4 -translate-1/2 animate-spin rounded-full border-2 border-t-transparent transition-opacity duration-500 ease-in-out',
							variant === 'secondary' ? 'border-gray-900' : 'border-white',
							loading ? 'opacity-100' : 'opacity-0'
						)}
						role="status"
					/>
				)}
				<span
					className={clsx(
						'flex items-center transition-opacity duration-500 ease-in-out',
						loading ? 'opacity-0' : 'opacity-100'
					)}
				>
					{children}
				</span>
			</button>
		);
	}
);
