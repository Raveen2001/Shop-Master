import { TCategoryData } from "schema";
import {
  getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
} from "ui";

import { EditTwoTone } from "ui/icons";

const columnHelper = createColumnHelper<TCategoryData>();

//! depth decides if it is category or subCategory
//! depth 1 - category, 2 - subCategory.

export const columnsDefs = [
  getSubRowColumnOption<TCategoryData>(),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",

    cell: ({
      row: {
        depth,
        original: { name, image },
      },
    }) => {
      return (
        <Box
          sx={{
            paddingLeft: `${depth * 2}rem`,
          }}
        >
          <TableProfileCell name={name} imageUrl={image} />
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
        >
          <IconButton>
            <EditTwoTone />
          </IconButton>
        </Box>
      );
    },
  }),
];
