import { Box, Card, CardContent, Typography } from "@mui/material";
import { flexRender, Row } from "@tanstack/react-table";

interface MobileCardProps<T> {
  row: Row<T>;
}

const MobileCard = <T,>({ row }: MobileCardProps<T>) => {
  return (
    <Card className="mb-4 shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <Box className="space-y-3">
          {row.getVisibleCells().map((cell) => {
            const column = cell.column;
            const header = column.columnDef.header;
            const cellValue = flexRender(
              column.columnDef.cell,
              cell.getContext(),
            );

            // Skip action columns in mobile view
            if (column.id === "action") return null;

            return (
              <Box key={cell.id} className="flex flex-col">
                <Typography
                  variant="caption"
                  className="text-gray-500 font-medium mb-1"
                >
                  {typeof header === "string" ? header : "Field"}
                </Typography>
                <Box className="text-sm">{cellValue}</Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MobileCard;
