import { Pencil, Trash2 } from "lucide-react";

interface MetadataActionsProps {
  onRename: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  disabled?: boolean;
}

export function MetadataActions({
  onRename,
  onDelete,
  isDeleting = false,
  disabled = false,
}: MetadataActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={onRename}
        disabled={disabled || isDeleting}
        aria-label="Rename"
        title="Rename"
        className="rounded-md p-2 text-gray-500 transition hover:bg-sam-blue/10 hover:text-sam-blue disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={disabled || isDeleting}
        aria-label="Delete"
        title="Delete"
        className="rounded-md p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}