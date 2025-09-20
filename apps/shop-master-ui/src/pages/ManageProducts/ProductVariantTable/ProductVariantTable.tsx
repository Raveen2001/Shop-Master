import { TProductData, TProductVariantData } from "schema";
import { Row, ReactTable } from "ui";
import { createColumnsDefs } from "./columns";

type TProductVariantListProps = {
  row: Row<TProductData>;
  onEdit?: (variant: TProductVariantData) => void;
};

const ProductVariantList = ({ row, onEdit }: TProductVariantListProps) => {
  const variants = row.original.variants ?? [];
  return <ReactTable columns={createColumnsDefs(onEdit)} data={variants} />;
};

export default ProductVariantList;
