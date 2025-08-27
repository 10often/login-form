import clsx from 'clsx';
import { CheckIcon, EyeIcon, EyeOffIcon, PlusIcon } from 'lucide-react';
import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '../../shared/ui';
import { type LoginFieldValues, PasswordConstraints } from './types';
import { getFlattenErrors } from './utils';

interface Props {
	authType?: 'login' | 'signup';
	errors?: FieldError;
	isTouched: boolean;
	register: UseFormRegisterReturn<LoginFieldValues['confirmPassword']>;
	value: string;
}

const passwordConstraints = [
	PasswordConstraints.MIN_LENGTH,
	PasswordConstraints.REQUIRES_LETTER,
	PasswordConstraints.REQUIRES_NUMBER,
	PasswordConstraints.REQUIRES_SPECIAL_CHAR,
];

export const PasswordInput = ({ authType, errors, isTouched, register, value }: Props) => {
	const passwordInputRef = useRef<HTMLInputElement | null>(null);

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = useCallback(() => {
		setShowPassword((prev) => !prev);
		passwordInputRef.current?.focus();
	}, []);

	const { ref: passwordRef, ...passwordRegister } = register;

	const flattenErrors = useMemo(() => getFlattenErrors(errors?.types), [errors?.types]);

	const getListMarker = useCallback(
		(constraint: PasswordConstraints): ReactNode => {
			if (!isTouched && !value) {
				return (
					<span aria-label="Constraint info" className="m-1.5 inline-block size-1 shrink-0 rounded-full bg-gray-500" />
				);
			}

			if (flattenErrors.includes(constraint)) {
				return <PlusIcon aria-label="Constraint mismatched" className="inline size-4 shrink-0 rotate-45" />;
			} else {
				return <CheckIcon aria-label="Constraint resolved" className="inline size-4 shrink-0" />;
			}
		},
		[flattenErrors, isTouched, value]
	);

	return (
		<Input
			isError={!!errors}
			label="Password:"
			autoComplete="current-password"
			type={showPassword ? 'text' : 'password'}
			ref={(el) => {
				passwordRef(el);
				passwordInputRef.current = el;
			}}
			renderHelperSlot={(id: string) =>
				authType === 'signup' ? (
					<ul id={id} className="mt-1 flex list-none flex-wrap gap-y-2 text-left text-xs">
						{passwordConstraints.map((constraint, index) => (
							<li
								key={index}
								className={clsx(
									'flex w-1/2 items-start',
									flattenErrors.includes(constraint) && 'text-red-500',
									!value ? 'text-gray-500' : 'text-green-500'
								)}
							>
								{getListMarker(constraint)}
								{constraint}
							</li>
						))}
					</ul>
				) : (
					<p id={id} className="absolute -bottom-4 left-0 text-left text-xs text-red-500">
						{errors?.message}
					</p>
				)
			}
			tailAdornment={
				<button
					aria-label={showPassword ? 'Hide password' : 'Show password'}
					aria-pressed={showPassword}
					className="cursor-pointer focus:rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none [&>svg]:stroke-stone-400 hover:[&>svg]:stroke-stone-600"
					type="button"
					onClick={handleShowPassword}
				>
					{showPassword ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
				</button>
			}
			wrapperClassName="mb-4"
			{...passwordRegister}
		/>
	);
};
