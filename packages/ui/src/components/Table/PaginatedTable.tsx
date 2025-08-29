import React, { ChangeEvent, Fragment } from "react";
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
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import ShowStatus from "./ShowStatus";
import MobileCard from "./MobileCard";

interface IReactQueryPaginatedTableProps<T, K>
  extends React.HTMLAttributes<HTMLElement> {
  columns: ColumnDef<T, K>[];
  data: T[];
  defaultSortColumn?: ColumnSort;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getSubRows?: (originalRow: T, index: number) => T[];
  getRowCanExpand?: (row: Row<T>) => boolean;
}

const ReactQueryPaginatedTable = <T, K>({
  columns,
  data,
  defaultSortColumn,
  getSubRows,
  getRowCanExpand,
  renderSubComponent,
  className,
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
    getRowCanExpand: getRowCanExpand,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <Box className={clsx("flex flex-col w-full h-full isolate", className)}>
      {/* Mobile Card Layout */}
      <Box className="lg:hidden">
        {containsData ? (
          <Box className="space-y-4">
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <MobileCard row={row} />
                {renderSubComponent &&
                  row.getIsExpanded() &&
                  row.getCanExpand() && (
                    <Box className="ml-4 border-l-2 border-gray-200 pl-4">
                      {renderSubComponent({ row })}
                    </Box>
                  )}
              </Fragment>
            ))}
          </Box>
        ) : (
          <Box className="w-full h-80 flex justify-center items-center p-4">
            <ShowStatus />
          </Box>
        )}
      </Box>

      {/* Desktop Table Layout */}
      <Box className="hidden lg:block relative w-full overflow-auto border border-dotted border-slate-400 flex-1">
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
                  <Fragment key={row.id}>
                    <TableRow className="hover:bg-slate-50">
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
                    {renderSubComponent &&
                      row.getIsExpanded() &&
                      row.getCanExpand() && (
                        <TableRow>
                          {/* 2nd row is a custom 1 cell row */}
                          <TableCell colSpan={row.getVisibleCells().length}>
                            {renderSubComponent &&
                              renderSubComponent({
                                row,
                              })}
                          </TableCell>
                        </TableRow>
                      )}
                  </Fragment>
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

      {/* Responsive Pagination */}
      <TablePagination
        component="div"
        className="overflow-hidden"
        count={data.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(e, page) => {
          table.setPageIndex(page);
        }}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
          table.setPageSize(Number(e.target.value));
        }}
        labelRowsPerPage="Rows per page:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
        }
        rowsPerPageOptions={[5, 10, 25, 50]}
        SelectProps={{
          size: "small",
        }}
        sx={{
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            },
          ".MuiTablePagination-select": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          },
        }}
      />
    </Box>
  );
};

export default ReactQueryPaginatedTable;
