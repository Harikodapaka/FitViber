export default function Loading() {
	return (
		<div role="status">
			<div className="animate-pulse my-4">
				<div className="h-4 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
				<div className="h-8 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
				<div className="h-6 bg-gray-400 rounded-lg w-48 mb-4 mx-auto"></div>
			</div>
			<div className="animate-pulse">
				<div className="h-32 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
				<div className="h-32 bg-gray-400 rounded-lg w-48 mb-4 w-full"></div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
