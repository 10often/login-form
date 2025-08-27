import { Input } from '../../shared/ui';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import type { LoginFieldValues } from './types';

interface Props {
	errors?: FieldError;
	register: UseFormRegisterReturn<LoginFieldValues['email']>;
}

export const EmailInput = ({ errors, register }: Props) => {
	return (
		<Input
			isError={!!errors}
			label="Email:"
			autoComplete="username"
			placeholder="example@mail.com"
			type="email"
			wrapperClassName="mb-4"
			renderHelperSlot={(id: string) => (
				<p id={id} className="absolute -bottom-4 left-0 text-left text-xs text-red-500">
					{errors?.message}
				</p>
			)}
			{...register}
		/>
	);
};
