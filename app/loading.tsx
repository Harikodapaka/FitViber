export default function Loading() {
	return (
		<div role="status">
			<div className="animate-pulse my-4">
				<div className="h-6 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
				<div className="h-6 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
				<div className="h-6 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
			</div>
			<div className="animate-pulse mt-16">
				<div className="h-6 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
