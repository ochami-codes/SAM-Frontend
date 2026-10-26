"use client";

import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MediaCardActionsProps {
publicId: string;
secureUrl: string;
filename: string;
isInUse: boolean;
isDeleting: boolean;
onDelete: () => void;
}

export function MediaCardActions({
publicId,
secureUrl,
filename,
isInUse,
isDeleting,
onDelete,
}: MediaCardActionsProps) {
async function copyToClipboard(
value: string,
successMessage: string
) {
try {
await navigator.clipboard.writeText(value);
toast.success(successMessage);
} catch {
toast.error("Failed to copy to clipboard.");
}
}

return ( <div className="space-y-2"> <div className="flex flex-wrap gap-2">
<button
type="button"
onClick={() =>
void copyToClipboard(
secureUrl,
"Image URL copied to clipboard."
)
}
className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
> <Copy size={13} />
Copy URL </button>

    <button
      type="button"
      onClick={() =>
        void copyToClipboard(
          publicId,
          "Image public ID copied to clipboard."
        )
      }
      className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
    >
      <Copy size={13} />
      Copy ID
    </button>
  </div>

  <button
    type="button"
    onClick={onDelete}
    disabled={isInUse || isDeleting}
    title={
      isInUse
        ? "Remove this image from managed content before deleting it."
        : `Delete ${filename}`
    }
    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Trash2 size={15} />

    {isDeleting ? "Deleting..." : "Delete image"}
  </button>
</div>

);
}
