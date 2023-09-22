import { FC } from "react";
import { useGlobalStore } from "../store/globalStore";
import { TableProfileCell } from "ui";

const OwnerTableCell: FC = () => {
  const owner = useGlobalStore((state) => state.owner);
  return (
    <TableProfileCell
      name={owner?.name ?? ""}
      subText={"Owner"}
      imageUrl={owner?.image}
    />
  );
};

export default OwnerTableCell;
