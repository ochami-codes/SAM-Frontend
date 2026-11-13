interface StructurePageStateProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
}

export function StructurePageState({
  isLoading,
  isError,
  error,
  onRetry,
}: StructurePageStateProps) {
  if (isLoading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading content structure...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-800">
          Unable to load content structure
        </h2>

        <p className="mt-1 text-sm text-red-700">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return null;
}