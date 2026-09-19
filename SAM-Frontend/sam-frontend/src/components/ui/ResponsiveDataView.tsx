import type { ReactNode } from "react";

import {
  DataTable,
  type DataTableColumn,
} from "./DataTable";

import { MobileDataList } from "./MobileDataList";

interface ResponsiveDataViewProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => string;
  renderMobileItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

export function ResponsiveDataView<T>({
  data,
  columns,
  getRowKey,
  renderMobileItem,
  emptyMessage = "No data found.",
}: ResponsiveDataViewProps<T>) {
  return (
    <>
      <div className="hidden md:block">
        <DataTable
          data={data}
          columns={columns}
          getRowKey={getRowKey}
          emptyMessage={emptyMessage}
        />
      </div>

      <div className="md:hidden">
        <MobileDataList
          data={data}
          getItemKey={getRowKey}
          renderItem={renderMobileItem}
          emptyMessage={emptyMessage}
        />
      </div>
    </>
  );
}