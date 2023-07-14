import {
  DashboardTwoTone,
  ManageAccountsTwoTone,
  PaymentTwoTone,
  PeopleAltTwoTone,
  WorkTwoTone,
  StoreTwoTone,
  EngineeringTwoTone,
} from "ui/icons";

export const sidebarItemParentForMatch: Record<string, string> = {
  "/employees/create": "/employees",
  "/employees/edit": "/employees",
  "/shops/create": "/shops",
  "/shops/edit": "/shops",
};

export const sidebarItems: ISidebarItem[] = [
  // {
  //   name: "Overview",
  //   items: [
  //     {
  //       name: "Dashboard",
  //       path: "/",
  //       icon: <DashboardTwoTone />,
  //     },
  //     {
  //       name: "Employee",
  //       path: "/employee",
  //       icon: <WorkTwoTone />,
  //     },
  //     {
  //       name: "Customer",
  //       path: "/customer",
  //       icon: <PeopleAltTwoTone />,
  //     },
  //   ],
  // },
  {
    name: "Employee",
    items: [
      {
        name: "Manage Employees",
        path: "/employees",
        icon: <EngineeringTwoTone />,
      },
      {
        name: "Payment History",
        path: "/employees/payment-history",
        icon: <PaymentTwoTone />,
      },
    ],
  },
  {
    name: "Customer",
    items: [
      {
        name: "Manage Customers",
        path: "/customers",
        icon: <ManageAccountsTwoTone />,
      },
      {
        name: "Payment History",
        path: "/customers/payment-history",
        icon: <PaymentTwoTone />,
      },
    ],
  },
  {
    name: "Shop",
    items: [
      {
        name: "Manage Shops",
        path: "/shops",
        icon: <StoreTwoTone />,
      },
    ],
  },
];
