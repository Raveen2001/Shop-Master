import { People, VerifiedUser } from "ui/icons";

const sidebarItems: ISidebarItem[] = [
  {
    name: "Overview",
    items: [
      {
        name: "Employee",
        path: "/employee",
        icon: <VerifiedUser />,
      },
      {
        name: "Customer",
        path: "/customer",
        icon: <People />,
      },
    ],
  },
];
