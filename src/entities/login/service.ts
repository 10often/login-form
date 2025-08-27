import { mockLoginRequestWithStatus, mockSignupRequestWithStatus } from './requests';
import type { ApiResponse, LoginRequest, SignupRequest } from './types';

class LoginService {
	async submitAuthFormWithStatus(
		authType: 'login' | 'signup',
		data: LoginRequest | SignupRequest,
		expectedStatus?: number
	): Promise<ApiResponse> {
		try {
			let response: Response;

			if (authType === 'login') {
				response = await mockLoginRequestWithStatus(data as LoginRequest, expectedStatus as 200 | 401 | 500);
			} else {
				response = await mockSignupRequestWithStatus(data as SignupRequest, expectedStatus as 201 | 409 | 500);
			}

			return (await response.json()) as ApiResponse;
		} catch {
			return {
				success: false,
				message: 'Network error occurred',
			};
		}
	}
}

export const loginService = new LoginService();
