import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="size-full p-8">
			<h1 className="text-center text-3xl">Home</h1>
			<p>These are the home page.</p>
		</div>
	);
}
