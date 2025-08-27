import { Link } from '../../shared/ui';

interface Props {
	authType: 'login' | 'signup';
	onChangeAuthType: () => void;
}

export const LoginHeading = ({ authType, onChangeAuthType }: Props) => {
	if (authType === 'signup') {
		return (
			<Heading
				heading="Sign up"
				paragraph="Already have an account?"
				authType="login"
				linkLabel="Login"
				onLinkClick={onChangeAuthType}
			/>
		);
	}

	return (
		<Heading
			heading="Login"
			paragraph="New here?"
			authType="signup"
			linkLabel="Sign up"
			onLinkClick={onChangeAuthType}
		/>
	);
};

const Heading = ({
	heading,
	paragraph,
	authType,
	linkLabel,
	onLinkClick,
}: {
	heading: string;
	paragraph?: string;
	authType: 'login' | 'signup';
	linkLabel: string;
	onLinkClick: () => void;
}) => {
	return (
		<>
			<h1 className="text-center text-2xl font-medium sm:text-3xl sm:leading-12">{heading}</h1>
			<p className="mt-2 text-center text-gray-600 sm:mt-4 sm:text-lg sm:leading-6">
				{paragraph}&nbsp;
				<Link onClick={() => onLinkClick()} size="large" to="/auth" search={{ type: authType }}>
					{linkLabel}
				</Link>
			</p>
		</>
	);
};
