const LoadingCardSkeleton = (
	<div className="shadow rounded-lg p-4 w-full bg-white my-3">
		<div className="flex space-x-4 items-center">
			<div className="flex-1 space-y-6 py-1">
				<div className="h-4 bg-gray-400 rounded"></div>
				<div className="space-y-3">
					<div className="grid grid-cols-3 gap-4">
						<div className="h-6 bg-gray-400 rounded col-span-2"></div>
						<div className="h-6 bg-gray-400 rounded col-span-1"></div>
					</div>
					<div className="h-2 bg-gray-400 rounded"></div>
				</div>
			</div>
			<div className="rounded-full bg-gray-400 h-16 w-16"></div>
		</div>
	</div>
);
export default function Loading() {
	return (
		<div role="status" className="animate-pulse">
			<div className="h-2 bg-gray-400 rounded my-3 max-w-sm"></div>
			{LoadingCardSkeleton}
			{LoadingCardSkeleton}
			{LoadingCardSkeleton}
			{LoadingCardSkeleton}
			<span className="sr-only">Loading...</span>
		</div>
	);
}
