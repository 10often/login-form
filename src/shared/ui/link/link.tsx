import React from 'react';
import { Link as LinkElement, type LinkComponentProps } from '@tanstack/react-router';
import clsx from 'clsx';

interface Props extends LinkComponentProps {
	children?: React.ReactNode;
	className?: string;
	size?: 'small' | 'medium' | 'large';
}

export const Link = ({ children, className, size = 'medium', ...props }: Props) => {
	return (
		<LinkElement
			className={clsx(
				'text-gray-600 underline hover:text-black focus:rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
				size === 'small' && 'text-sm',
				size === 'medium' && 'text-base',
				size === 'large' && 'text-lg',
				className
			)}
			{...props}
		>
			{children}
		</LinkElement>
	);
};
