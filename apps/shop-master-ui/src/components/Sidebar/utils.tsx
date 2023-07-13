import {
  DashboardTwoTone,
  ManageAccountsTwoTone,
  PaymentTwoTone,
  PeopleAltTwoTone,
  WorkTwoTone,
  StoreTwoTone,
  EngineeringTwoTone,
} from "ui/icons";

export const sidebarItems: ISidebarItem[] = [
  {
    name: "Overview",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: <DashboardTwoTone />,
      },
      {
        name: "Employee",
        path: "/employee",
        icon: <WorkTwoTone />,
      },
      {
        name: "Customer",
        path: "/customer",
        icon: <PeopleAltTwoTone />,
      },
    ],
  },
  {
    name: "Employee",
    items: [
      {
        name: "Manage Employees",
        path: "/employee/manage",
        icon: <EngineeringTwoTone />,
      },
      {
        name: "Payment History",
        path: "/employee/payment-history",
        icon: <PaymentTwoTone />,
      },
    ],
  },
  {
    name: "Customer",
    items: [
      {
        name: "Manage Customers",
        path: "/customer/manage",
        icon: <ManageAccountsTwoTone />,
      },
      {
        name: "Payment History",
        path: "/customer/payment-history",
        icon: <PaymentTwoTone />,
      },
    ],
  },
  {
    name: "Shop",
    items: [
      {
        name: "Manage Shops",
        path: "/shop/manage",
        icon: <StoreTwoTone />,
      },
    ],
  },
];
