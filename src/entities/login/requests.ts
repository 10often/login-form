import type { ApiResponse, LoginRequest, SignupRequest } from './types';

export const mockLoginRequestWithStatus = async (
	data: LoginRequest,
	expectedStatus: 200 | 401 | 500 = 200
): Promise<Response> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	switch (expectedStatus) {
		case 500:
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Something went wrong. Please try again later.',
				} as ApiResponse),
				{
					status: 500,
					statusText: 'Internal Server Error',
					headers: { 'Content-Type': 'application/json' },
				}
			);

		case 401:
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid email or password',
				} as ApiResponse),
				{
					status: 401,
					statusText: 'Unauthorized',
					headers: { 'Content-Type': 'application/json' },
				}
			);

		case 200:
		default:
			return new Response(
				JSON.stringify({
					success: true,
					data: {
						user: {
							email: data.email,
							token: 'mock-jwt-token-' + Date.now(),
						},
					},
					message: 'Login successful',
				} as ApiResponse),
				{
					status: 200,
					statusText: 'OK',
					headers: { 'Content-Type': 'application/json' },
				}
			);
	}
};

export const mockSignupRequestWithStatus = async (
	data: SignupRequest,
	expectedStatus: 201 | 409 | 500 = 201
): Promise<Response> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	switch (expectedStatus) {
		case 500:
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Something went wrong. Please try again later.',
				} as ApiResponse),
				{
					status: 500,
					statusText: 'Internal Server Error',
					headers: { 'Content-Type': 'application/json' },
				}
			);

		case 409:
			return new Response(
				JSON.stringify({
					success: false,
					message: 'User with this email already exists',
					errors: {
						email: 'User with this email already exists',
					},
				} as ApiResponse),
				{
					status: 409,
					statusText: 'Conflict',
					headers: { 'Content-Type': 'application/json' },
				}
			);

		case 201:
		default:
			return new Response(
				JSON.stringify({
					success: true,
					data: {
						user: {
							email: data.email,
							token: 'mock-jwt-token-' + Date.now(),
						},
					},
					message: 'Registration successful',
				} as ApiResponse),
				{
					status: 201,
					statusText: 'Created',
					headers: { 'Content-Type': 'application/json' },
				}
			);
	}
};
