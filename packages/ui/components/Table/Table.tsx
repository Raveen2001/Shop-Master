import React, { ChangeEvent } from "react";
import { flatten } from "lodash";

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
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { IPaginatedData } from "./../../models";
import ShowStatus from "./ShowStatus";
import { AxiosResponse } from "axios";

interface ITableProps<T, K> {
  columns: ColumnDef<T, K>[];
  queryFn: (
    context: QueryFunctionContext,
  ) => Promise<AxiosResponse<IPaginatedData<T>>>;
  queryKeys: string[];
}
const Table = <T, K>({ columns, queryFn, queryKeys }: ITableProps<T, K>) => {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 2,
    });

  const fetchDataOptions = {
    page: pageIndex,
    limit: pageSize,
  };

  const {
    data: axiosResponse,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [...queryKeys, fetchDataOptions],
    queryFn: queryFn,
    meta: fetchDataOptions,
  });

  const containsData = React.useMemo(() => {
    return !isLoading && !isError && axiosResponse.data.rows.length > 0;
  }, [axiosResponse]);

  const table = useReactTable({
    data: axiosResponse?.data.rows ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
            <ShowStatus isLoading={isLoading} isError={isError} />
          </Box>
        )}
      </Box>

      {containsData && (
        <TablePagination
          component="div"
          count={axiosResponse?.data.total ?? 0}
          page={pageIndex}
          rowsPerPageOptions={[2, 4]}
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
