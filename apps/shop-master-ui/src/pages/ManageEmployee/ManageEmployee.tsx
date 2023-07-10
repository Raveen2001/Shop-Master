import { Table } from "ui";

import { columnsDefs } from "./columns";

const ManageEmployee = () => {
  return (
    <div>
      <Table
        columns={columnsDefs}
        queryFn={async () => ({
          rows: [
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
            {
              username: "test",
              email: "test",
              phone: "test",
              address: "test",
              type: "test",
              createdAt: "test",
              image: "test",
              name: "test",
              password: "test",
            },
          ],
          pageNumber: 5,
          totalCount: 100,
        })}
      />
    </div>
  );
};

export default ManageEmployee;
