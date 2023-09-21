import { Link } from "react-router-dom";
import { TProductData } from "schema";
import {
  getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
} from "ui";

import { EditTwoTone, AddCircleTwoTone } from "ui/icons";

const columnHelper = createColumnHelper<TProductData>();

export const columnsDefs = [
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
