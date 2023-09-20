import React, { ChangeEvent, useMemo } from "react";
import clsx from "clsx";

import {
  Box,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import ShowStatus from "./ShowStatus";

interface IReactQueryPaginatedTableProps<T, K> {
  columns: ColumnDef<T, K>[];
  data: T[];
  defaultSortColumn?: ColumnSort;
  getSubRows?: (originalRow: T, index: number) => T[];
}
const ReactQueryPaginatedTable = <T, K>({
  columns,
  data,
  defaultSortColumn,
  getSubRows,
}: IReactQueryPaginatedTableProps<T, K>) => {
  const containsData = React.useMemo(() => {
    return data.length > 0;
  }, [data]);

  const [sorting, setSorting] = React.useState<SortingState>(
    defaultSortColumn ? [defaultSortColumn] : [],
  );

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
    },
    getSubRows: getSubRows,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <Box>
      <Box className="relative w-full overflow-auto border border-dotted border-slate-400 max-h-[50vh]">
        <MUITable className={`w-[${table.getTotalSize()}px]`}>
          <TableHead className={`bg-slate-100 sticky top-0 z-10`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Box
                          className={clsx("flex items-center text-slate-500", {
                            "cursor-pointer select-none":
                              header.column.getCanSort(),
                            "text-slate-900": header.column.getIsSorted(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                          sx={{
                            width: header.column.getSize(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {header.column.getCanSort() &&
                            {
                              asc: <ArrowUpwardRounded fontSize="small" />,
                              desc: <ArrowDownwardRounded fontSize="small" />,
                            }[header.column.getIsSorted() as string]}
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {containsData &&
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} className="hover:bg-slate-50">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </MUITable>

        {/* Shows no data message */}
        {!containsData && (
          <Box className="w-full h-80 sticky inset-0 flex justify-center items-center p-4">
            <ShowStatus />
          </Box>
        )}
      </Box>

      <TablePagination
        component="div"
        count={data.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(e, page) => {
          table.setPageIndex(page);
        }}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
          table.setPageSize(Number(e.target.value));
        }}
      />
    </Box>
  );
};

export default ReactQueryPaginatedTable;
