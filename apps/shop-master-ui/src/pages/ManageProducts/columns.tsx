import { Link } from "react-router-dom";
import { TProductData } from "schema";
import {
  getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
  ColumnDef,
} from "ui";

import { EditTwoTone, AddCircleTwoTone, Visibility } from "ui/icons";

const columnHelper = createColumnHelper<TProductData>();

export const columnsDefs: ColumnDef<TProductData, any>[] = [
  getSubRowColumnOption<TProductData>(),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",

    cell: ({
      row: {
        original: { name },
      },
    }) => {
      return <TableProfileCell name={name} />;
    },
  }),

  columnHelper.accessor("category.name", {
    id: "category",
    header: "Category",

    cell: ({
      row: {
        original: { category },
      },
    }) => {
      if (!category) return "-";
      return (
        <TableProfileCell name={category.name} imageUrl={category.image} />
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),

  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => {
      const date = getValue();
      return <TableDateTimeCell date={date} />;
    },
  }),

  columnHelper.display({
    id: "action",
    header: "Actions",
    cell: ({
      row: {
        original: { id },
      },
    }) => {
      return (
        <Box className="flex gap-2">
          <Link to={`/products/${id}`}>
            <IconButton color="primary">
              <Visibility />
            </IconButton>
          </Link>

          <IconButton>
            <EditTwoTone />
          </IconButton>

          <Link to={`${id}/product-variant/create`}>
            <IconButton>
              <AddCircleTwoTone />
            </IconButton>
          </Link>
        </Box>
      );
    },
  }),
];
