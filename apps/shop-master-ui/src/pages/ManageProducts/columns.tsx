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
        depth,
        original: { name },
      },
    }) => {
      return (
        <Box
          sx={{
            paddingLeft: `${depth * 2}rem`,
          }}
        >
          <TableProfileCell name={name} />
        </Box>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created At",
    cell: ({ getValue, row: { depth } }) => {
      const date = getValue();
      return (
        <Box
          sx={{
            paddingLeft: `${depth * 2}rem`,
          }}
        >
          <TableDateTimeCell date={date} />
        </Box>
      );
    },
  }),
  columnHelper.accessor("updatedAt", {
    id: "updatedAt",
    header: "Updated At",
    cell: ({ getValue, row: { depth } }) => {
      const date = getValue();
      return (
        <Box
          sx={{
            paddingLeft: `${depth * 2}rem`,
          }}
        >
          <TableDateTimeCell date={date} />
        </Box>
      );
    },
  }),

  columnHelper.display({
    id: "action",
    header: "Actions",
    cell: ({
      row: {
        depth,
        original: { id },
      },
    }) => {
      return (
        <Box
          sx={{
            paddingLeft: `${depth * 2}rem`,
          }}
          className="flex gap-2"
        >
          <IconButton>
            <EditTwoTone />
          </IconButton>

          {depth === 0 && (
            <Link to={`${id}/product-variant/create`}>
              <IconButton>
                <AddCircleTwoTone />
              </IconButton>
            </Link>
          )}
        </Box>
      );
    },
  }),
];
