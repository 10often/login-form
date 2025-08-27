import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../pages/login.page';

type AuthSearch = {
	type: 'login' | 'signup';
};

export const Route = createFileRoute('/auth')({
	component: Auth,
	validateSearch: (search: Record<string, unknown>): AuthSearch => {
		return {
			type: (search?.type as 'login' | 'signup') ?? 'login',
		};
	},
});

function Auth() {
	return <LoginPage />;
}
