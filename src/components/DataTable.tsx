import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export function DataTable({
  columns,
  data,
  rowCount,
  state,
  onPaginationChange,
  onSortingChange,
  onRowSelectionChange,
  onColumnVisibilityChange,
}: any) {
  const table =
    useMaterialReactTable({
      columns,
      data,

      manualPagination: true,

      manualSorting: true,

      rowCount,

      enableRowSelection: true,

      enableColumnOrdering: true,

      enableColumnResizing: true,

      enableColumnVirtualization:
        true,

      enablePagination: true,

      paginationDisplayMode:
        "pages",

      muiPaginationProps: {
        rowsPerPageOptions: [
          25,
          50,
          100,
        ],
      },

      muiTableContainerProps: {
        sx: {
          maxHeight: "70vh",
        },
      },

      initialState: {
        density: "compact",
      },

      state,

      onPaginationChange,

      onSortingChange,

      onRowSelectionChange,

      onColumnVisibilityChange,
    });

  return (
    <MaterialReactTable
      table={table}
    />
  );
}
