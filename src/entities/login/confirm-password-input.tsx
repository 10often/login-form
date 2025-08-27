import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '../../shared/ui';
import type { LoginFieldValues } from './types';

interface Props {
	errors?: FieldError;
	register: UseFormRegisterReturn<LoginFieldValues['confirmPassword']>;
}

export const ConfirmPasswordInput = ({ errors, register }: Props) => {
	const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleShowConfirmPassword = useCallback(() => {
		setShowConfirmPassword((prev) => !prev);
		confirmPasswordInputRef.current?.focus();
	}, []);

	const { ref: confirmPasswordRef, ...confirmPasswordRegister } = register;

	return (
		<Input
			isError={!!errors}
			label="Confirm password:"
			autoComplete="new-password"
			type={showConfirmPassword ? 'text' : 'password'}
			wrapperClassName="mb-4"
			ref={(el) => {
				confirmPasswordRef(el);
				confirmPasswordInputRef.current = el;
			}}
			renderHelperSlot={(id: string) => (
				<p id={id} className="absolute -bottom-4 left-0 text-left text-xs text-red-500">
					{errors?.message}
				</p>
			)}
			tailAdornment={
				<button
					aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
					aria-pressed={showConfirmPassword}
					className="cursor-pointer focus:rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none [&>svg]:stroke-stone-400 hover:[&>svg]:stroke-stone-600"
					type="button"
					onClick={handleShowConfirmPassword}
				>
					{showConfirmPassword ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
				</button>
			}
			{...confirmPasswordRegister}
		/>
	);
};
