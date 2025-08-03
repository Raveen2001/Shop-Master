import { FC } from "react";
import { TProductData } from "schema";
import { Row, ReactTable } from "ui";
import { columnsDefs } from "./columns";

type TProductVariantListProps = {
  row: Row<TProductData>;
};

const ProductVariantList = ({ row }: TProductVariantListProps) => {
  const variants = row.original.variants ?? [];
  return <ReactTable columns={columnsDefs} data={variants} />;
};

export default ProductVariantList;
