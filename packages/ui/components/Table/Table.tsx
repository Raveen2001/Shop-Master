import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { IPaginatedData } from "./../../models";
import ShowStatus from "./ShowStatus";
import { AxiosResponse } from "axios";
import { ArrowDownwardRounded, ArrowUpwardRounded } from "@mui/icons-material";
import { IColumnSort } from "./model";

interface ITableProps<T, K> {
  columns: ColumnDef<T, K>[];
  queryFn: (
    context: QueryFunctionContext,
  ) => Promise<AxiosResponse<IPaginatedData<T>>>;
  queryKeys: string[];
  defaultSortColumn?: IColumnSort<T>;
  disableSorting?: boolean;
}
const Table = <T, K>({
  columns,
  queryFn,
  queryKeys,
  defaultSortColumn,
  disableSorting,
}: ITableProps<T, K>) => {
  const [sorting, setSorting] = useState<SortingState>(
    (defaultSortColumn ? [defaultSortColumn] : []) as SortingState,
  );
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
  });

  const fetchOptions = useMemo(() => {
    return {
      page: pagination.page,
      limit: pagination.limit,
      orderBy: sorting[0]?.id,
      order: sorting[0]?.desc ? "desc" : "asc",
    };
  }, [pagination, sorting]);

  const {
    data: axiosResponse,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [...queryKeys, fetchOptions],
    queryFn: queryFn,
    meta: fetchOptions,
  });

  const containsData = React.useMemo(() => {
    return !isLoading && !isError && axiosResponse.data.rows.length > 0;
  }, [axiosResponse]);

  const table = useReactTable({
    data: axiosResponse?.data.rows ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: (newSorting) => {
      setPagination((p) => ({
        ...p,
        page: 0,
      }));
      setSorting(newSorting as SortingState);
    },

    getCoreRowModel: getCoreRowModel(),
    enableSortingRemoval: false,
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
                        <Box
                          className={clsx("flex items-center text-slate-500", {
                            "cursor-pointer select-none":
                              header.column.getCanSort() && !disableSorting,
                            "text-slate-900":
                              header.column.id === sorting[0]?.id ||
                              disableSorting,
                          })}
                          onClick={
                            disableSorting
                              ? undefined
                              : header.column.getToggleSortingHandler()
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {disableSorting
                            ? null
                            : {
                                asc: <ArrowUpwardRounded fontSize="small" />,
                                desc: <ArrowDownwardRounded fontSize="small" />,
                              }[header.column.getIsSorted() as string] ?? null}
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

      <TablePagination
        component="div"
        count={axiosResponse?.data.total ?? 0}
        page={pagination.page}
        onPageChange={(e, page) => {
          setPagination((p) => ({
            ...p,
            page,
          }));
        }}
        rowsPerPage={pagination.limit}
        onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPagination((p) => ({
            ...p,
            limit: Number(e.target.value),
            page: 0,
          }));
        }}
      />
    </Box>
  );
};

export default Table;
