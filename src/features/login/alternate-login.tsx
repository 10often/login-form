import Facebook from '../../assets/facebook-icon.svg?react';
import Google from '../../assets/google-icon.svg?react';
import { Button } from '../../shared/ui';

const alternates = [
	{ label: 'Continue with Google', icon: <Google /> },
	{ label: 'Continue with Facebook', icon: <Facebook /> },
];

export const AlternateLogin = () => {
	return (
		<section aria-labelledby="alternate-login-heading">
			<h2 id="alternate-login-heading" className="sr-only">
				Alternative login methods
			</h2>
			<div className="mt-4 flex flex-col gap-y-2 sm:mt-10">
				{alternates.map((item) => (
					<Button
						key={item.label}
						variant="secondary"
						className=" "
						aria-describedby={`${item.label.toLowerCase().replace(/\s+/g, '-')}-desc`}
					>
						<span className="mr-2 inline-block size-4 align-middle [&>svg]:size-4" aria-hidden="true">
							{item.icon}
						</span>
						<span>{item.label}</span>
						<span id={`${item.label.toLowerCase().replace(/\s+/g, '-')}-desc`} className="sr-only">
							Opens {item.label.toLowerCase()} authentication in a new window
						</span>
					</Button>
				))}
			</div>
			<div className="my-4 flex items-center sm:my-8" role="separator" aria-label="or">
				<hr className="w-full border-gray-300" aria-hidden="true" />
				<span className="mx-4 text-sm whitespace-nowrap text-gray-500" aria-hidden="true">
					or
				</span>
				<hr className="w-full border-gray-300" aria-hidden="true" />
			</div>
		</section>
	);
};
