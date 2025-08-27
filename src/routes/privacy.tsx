import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="size-full p-8">
			<h1 className="text-center text-3xl font-semibold">Privacy Policy</h1>
			<p>These are the privacy policy.</p>
		</div>
	);
}
