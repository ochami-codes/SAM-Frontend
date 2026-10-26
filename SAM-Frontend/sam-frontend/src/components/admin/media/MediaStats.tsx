import { Image as ImageIcon, Images } from "lucide-react";

interface MediaStatsProps {
  total: number;
  isLoading: boolean;
}

export function MediaStats({
  total,
  isLoading,
}: MediaStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-sky-50 p-2">
            <Images
              className="h-5 w-5 text-sam-blue-dark"
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Loaded Images
            </p>

            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {isLoading ? "—" : total}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-sky-50 p-2">
            <ImageIcon
              className="h-5 w-5 text-sam-blue-dark"
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Storage
            </p>

            <p className="mt-1 text-sm font-medium text-gray-900">
              Managed by Cloudinary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}