import { TBrandData } from "schema";
import {
  getSubRowColumnOption,
  TableDateTimeCell,
  TableProfileCell,
  createColumnHelper,
} from "ui";

const columnHelper = createColumnHelper<TBrandData>();

export const columnsDefs = [
  getSubRowColumnOption<TBrandData>(),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: ({
      row: {
        original: { name, image },
      },
    }) => {
      return <TableProfileCell name={name} imageUrl={image} />;
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
];
