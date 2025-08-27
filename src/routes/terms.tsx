import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="size-full p-8">
			<h1 className="text-center text-3xl">Terms of Service</h1>
			<p>These are the terms of service.</p>
		</div>
	);
}
