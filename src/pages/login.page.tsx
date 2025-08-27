import { LoginWidget } from '../widgets/login';
import { Route } from '../routes/auth.tsx';

export const LoginPage = () => {
	const { type: authType } = Route.useSearch();

	return <LoginWidget authType={authType} />;
};
