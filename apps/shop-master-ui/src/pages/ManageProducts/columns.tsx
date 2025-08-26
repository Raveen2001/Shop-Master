import { Link } from "react-router-dom";
import { TProductData } from "schema";
import {
  // getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
  ColumnDef,
} from "ui";

import { EditTwoTone, Visibility } from "ui/icons";

const columnHelper = createColumnHelper<TProductData>();

export const createColumnsDefs = (
  onEdit?: (product: TProductData) => void
): ColumnDef<TProductData, any>[] => [
  // getSubRowColumnOption<TProductData>(),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",

    cell: ({
      row: {
        original: { name, tamilName },
      },
    }) => {
      return <TableProfileCell name={tamilName || name} />;
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
        <TableProfileCell
          name={category.tamilName || category.name}
          imageUrl={category.image}
        />
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
    cell: ({ row: { original } }) => {
      return (
        <Box className="flex gap-2">
          <Link to={`/products/${original.id}`}>
            <IconButton>
              <Visibility />
            </IconButton>
          </Link>

          <IconButton onClick={() => onEdit?.(original)}>
            <EditTwoTone />
          </IconButton>

          {/* <Link to={`${id}/product-variant/create`}>
            <IconButton>
              <AddCircleTwoTone />
            </IconButton>
          </Link> */}
        </Box>
      );
    },
  }),
];

// For backward compatibility
export const columnsDefs = createColumnsDefs();
