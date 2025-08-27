import clsx from 'clsx';
import { SettingsIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
	authType?: 'login' | 'signup';
	onChange: (value: number) => void;
}

const statuses = [
	{
		id: 'login',
		label: 'Successful login',
		value: '200',
		shouldShow: (authType: string) => authType === 'login',
	},
	{
		id: 'signup',
		label: 'Successful signup',
		value: '201',
		shouldShow: (authType: string) => authType === 'signup',
	},
	{
		id: 'unauthorized',
		label: 'Invalid credentials',
		value: '401',
		shouldShow: (authType: string) => authType === 'login',
	},
	{
		id: 'conflict',
		label: 'User already exists',
		value: '409',
		shouldShow: (authType: string) => authType === 'signup',
	},
	{
		id: 'server-error',
		label: 'Internal server error',
		value: '500',
		shouldShow: () => true,
	},
];

export const MockSettings = ({ authType, onChange }: Props) => {
	const [isOpenSettings, setIsOpenSettings] = useState(true);

	const openSettings = () => {
		setIsOpenSettings((prev) => !prev);
	};

	return (
		<div
			className={clsx(
				'flex items-end gap-2 transition-all duration-300 ease-linear',
				!isOpenSettings && '-translate-x-[-183px]'
			)}
		>
			<button
				className={clsx(
					'cursor-pointer transition-all duration-300 ease-linear',
					isOpenSettings ? '-rotate-[150deg]' : 'rotate-[150deg]'
				)}
				onClick={openSettings}
			>
				<SettingsIcon />
			</button>
			<div className="w-[175px] rounded-tl-lg border border-r-0 border-b-0 border-gray-300 bg-white p-2 shadow-lg">
				<p>Mock fetch</p>
				{statuses
					.filter((status) => status.shouldShow(authType || ''))
					.map((status) => (
						<div key={status.id} className="flex cursor-pointer">
							<input
								className="cursor-pointer"
								defaultChecked={[200, 201].includes(Number(status.value))}
								id={status.id}
								type="radio"
								name="response"
								value={status.value}
								onClick={(e) => onChange(Number((e.target as HTMLInputElement).value))}
							/>
							<label className="ml-1 w-full cursor-pointer" htmlFor={status.id}>
								{status.label}
							</label>
						</div>
					))}
			</div>
		</div>
	);
};
