import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: () => (
		<main className="flex size-full items-center justify-center bg-gray-100 p-px">
			<Outlet />
		</main>
	),
});
