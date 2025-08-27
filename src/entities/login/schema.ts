import z from 'zod';
import { PasswordConstraints } from './types';

export const getLoginSchema = (authType: 'signup' | 'login') =>
	z
		.object({
			email: z.email('Wrong email format').nonempty('Field is required'),
			password:
				authType === 'signup'
					? z
							.string()
							.min(8, PasswordConstraints.MIN_LENGTH)
							.regex(/[0-9]/, PasswordConstraints.REQUIRES_NUMBER)
							.regex(/[!@#$%^&*().?":{}|<>]/, PasswordConstraints.REQUIRES_SPECIAL_CHAR)
							.regex(/(?=.*[a-z])(?=.*[A-Z])/, PasswordConstraints.REQUIRES_LETTER)
							.nonempty(PasswordConstraints.FIELD_REQUIRED)
					: z.string(),
			confirmPassword: z.string(),
			rememberMe: z.boolean(),
		})
		.superRefine((data, ctx) => {
			if (authType === 'signup' && data.password !== data.confirmPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Passwords do not match',
					path: ['confirmPassword'],
				});
			}
		});
