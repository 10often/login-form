import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button, Checkbox, Link } from '../../shared/ui';
import {
	ConfirmPasswordInput,
	EmailInput,
	LoginHeading,
	PasswordInput,
	getLoginSchema,
	loginService,
	type LoginFieldValues,
} from '../../entities/login';
import { AlternateLogin, MockSettings } from '../../features/login';
import clsx from 'clsx';

interface Props {
	authType: 'login' | 'signup';
}

const defaultValues = {
	email: '',
	password: '',
	confirmPassword: '',
	rememberMe: true,
};

export const LoginWidget = ({ authType }: Props) => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);

	const { getValues, formState, register, handleSubmit, reset, trigger, setError } = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues,
		criteriaMode: 'all',
		resolver: zodResolver(getLoginSchema(authType)),
	});

	const [isLoading, setIsLoading] = useState(false);
	const [expectedResponseStatus, setExpectedResponseStatus] = useState(() => (authType === 'login' ? 200 : 201));
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		// Запускаем анимацию появления после монтирования компонента
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const onSubmit = async (data: LoginFieldValues) => {
		setErrorMessage('');
		setIsLoading(true);

		try {
			const result = await loginService.submitAuthFormWithStatus(authType, data, expectedResponseStatus);

			if (result.success) {
				console.log('Success:', result.message);
				void navigate({ to: '/home', replace: true });
			} else {
				console.error('Error:', result.message);

				if (result.errors) {
					Object.entries(result.errors).forEach(([field, message]) => {
						setError(field as keyof LoginFieldValues, { type: 'server', message });
					});
				} else {
					setErrorMessage(result.message || 'An unknown error occurred');
				}
			}
		} catch (error) {
			console.error('Network error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative flex size-full flex-col items-center justify-center gap-4 p-4">
			<div
				className={clsx(
					'w-full transform rounded-lg border border-red-300 bg-red-100 text-center text-red-700 transition-all duration-300 ease-in-out sm:mx-auto sm:w-[600px]',
					errorMessage
						? 'max-h-20 translate-y-0 scale-100 p-4 opacity-100'
						: 'max-h-0 -translate-y-2 scale-95 overflow-hidden border-0 p-0 opacity-0'
				)}
				role="alert"
				aria-live="polite"
			>
				{errorMessage && errorMessage}
			</div>
			<article
				className={clsx(
					'w-full transform rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-all duration-500 ease-out sm:mx-auto sm:w-[600px] sm:p-10',
					isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
				)}
			>
				<header>
					<LoginHeading
						authType={authType}
						onChangeAuthType={() => {
							reset();
							setErrorMessage('');
						}}
					/>
				</header>

				<AlternateLogin />

				<form className="mx-auto flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit(onSubmit)}>
					<fieldset className="flex flex-col gap-4 sm:gap-6">
						<legend className="sr-only">{authType === 'signup' ? 'Sign up' : 'Login'} form</legend>

						<EmailInput errors={formState.errors.email} register={register('email')} />

						<PasswordInput
							authType={authType}
							errors={formState.errors.password}
							isTouched={!!formState.touchedFields.password}
							register={register('password', {
								onChange: () => trigger('password'),
							})}
							value={getValues('password')}
						/>

						{authType === 'signup' && (
							<ConfirmPasswordInput
								errors={formState.errors.confirmPassword}
								register={register('confirmPassword', {
									onChange: () => trigger('confirmPassword'),
								})}
							/>
						)}
					</fieldset>

					<div className="flex w-full flex-col gap-2 sm:gap-4">
						<div className="flex flex-wrap justify-between gap-2">
							<Checkbox defaultChecked={getValues('rememberMe')} label="Remember me" {...register('rememberMe')} />
							{authType === 'login' && (
								<Link to="/" className="ml-auto text-sm text-gray-600 hover:text-gray-950">
									Forgot password?
								</Link>
							)}
						</div>
						<Button
							type="submit"
							disabled={Object.values(formState.errors).length > 0 || isLoading}
							loading={isLoading}
						>
							{authType === 'signup' ? 'Sign up' : 'Login'}
						</Button>

						{authType === 'signup' && (
							<p className="text-sm text-gray-600">
								By signing up, you agree to the&nbsp;
								<Link to="/terms" target="_blank" size="small">
									Terms of Service
								</Link>
								&nbsp; and&nbsp;
								<Link to="/privacy" target="_blank" size="small">
									Privacy Policy
								</Link>
								.
							</p>
						)}
					</div>
				</form>
			</article>
			<aside className="absolute right-0 bottom-0 overflow-hidden">
				<MockSettings authType={authType} onChange={setExpectedResponseStatus} />
			</aside>
		</div>
	);
};
