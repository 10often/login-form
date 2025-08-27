import type { MultipleFieldErrors } from 'react-hook-form';

export const getFlattenErrors = (errors?: MultipleFieldErrors): string[] => {
	if (!errors) {
		return [];
	}

	const result: string[] = [];

	Object.values(errors || {}).forEach((item) => {
		if (Array.isArray(item)) {
			result.push(...item);
		} else if (typeof item === 'string') {
			result.push(item);
		}
	});

	return result;
};
