import type { ReactNode } from "react";

interface MobileDataListProps<T> {
  data: T[];
  getItemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

export function MobileDataList<T>({
  data,
  getItemKey,
  renderItem,
  emptyMessage = "No data found.",
}: MobileDataListProps<T>) {
  if (data.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={getItemKey(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}