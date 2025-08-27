export enum PasswordConstraints {
	MIN_LENGTH = 'Use 8 or more characters',
	REQUIRES_NUMBER = 'Use a number (e.g. 1234)',
	REQUIRES_LETTER = 'Use upper and lower case letters (e.g. Aa)',
	REQUIRES_SPECIAL_CHAR = 'Use a symbol (e.g. !@#$)',
	FIELD_REQUIRED = 'Field is required',
}

export type LoginFieldValues = {
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
};

export interface LoginRequest {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface SignupRequest {
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe: boolean;
}

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	message?: string;
	errors?: Record<string, string>;
}
