import React, { ChangeEvent } from "react";

import {
  Box,
  CircularProgress,
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { PaginatedData } from "./models";
import ShowStatus from "./ShowStatus";

interface ITableProps<T, K> {
  columns: ColumnDef<T, K>[];
  queryFn: (options: any) => Promise<PaginatedData<T>>;
}
const Table = <T, K>({ columns, queryFn }: ITableProps<T, K>) => {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const { data, isError, isLoading } = useQuery(
    ["data", fetchDataOptions],
    queryFn,
    {
      keepPreviousData: true,
    },
  );

  const containsData = React.useMemo(() => {
    return data && data.rows.length > 0 && !isLoading && !isError;
  }, [data]);

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns,
    pageCount: data?.pageNumber ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  return (
    <Box>
      <Box className="relative w-full overflow-auto border border-dotted border-slate-400">
        <MUITable className={`w-[${table.getTotalSize()}px]`}>
          <TableHead className={`bg-slate-100 `}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Box>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
        {!containsData && (
          <Box className="w-full h-80 sticky inset-0 flex justify-center items-center p-4">
            <ShowStatus isLoading={true} isError={false} />
          </Box>
        )}
      </Box>

      {containsData && (
        <TablePagination
          component="div"
          count={data?.totalCount ?? 0}
          page={pageIndex}
          onPageChange={(e, page) => {
            setPagination((p) => ({
              ...p,
              pageIndex: page,
            }));
          }}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPagination((p) => ({
              ...p,
              pageSize: Number(e.target.value),
              pageIndex: 0,
            }));
          }}
        />
      )}
    </Box>
  );
};

export default Table;
