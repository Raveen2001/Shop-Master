import { Link } from "react-router-dom";
import { TCategoryData } from "schema";
import {
  getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
  Box,
  IconButton,
  ColumnDef,
} from "ui";

import { EditTwoTone, AddCircleTwoTone } from "ui/icons";

const columnHelper = createColumnHelper<TCategoryData>();

//! depth decides if it is category or subCategory
//! depth 0 - category, 1 - subCategory.
export const columnsDefs: ColumnDef<TCategoryData, any>[] = [
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
          className="flex gap-2"
        >
          <IconButton>
            <EditTwoTone />
          </IconButton>

          {depth === 0 && (
            <Link to={`${id}/sub-category/create`}>
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
