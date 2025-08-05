import {
  DashboardTwoTone,
  ManageAccountsTwoTone,
  PaymentTwoTone,
  PeopleAltTwoTone,
  WorkTwoTone,
  CategoryTwoTone,
  FitbitTwoTone,
  StoreTwoTone,
  EngineeringTwoTone,
  InventoryTwoTone,
  NoteTwoTone,
  NoteAddTwoTone,
} from "ui/icons";
import { TSidebarItem } from "./models";

export const SIDEBAR_ITEMS: TSidebarItem[] = [
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
    name: "Order",
    items: [
      {
        name: "Manage Orders",
        path: "/orders",
        icon: <NoteTwoTone className="rotate-90 -scale-x-100" />,
        highlightPathPattern: /^\/orders(\/edit)?$/,
      },
      {
        name: "New Order",
        path: "/orders/create",
        icon: <NoteAddTwoTone />,
        highlightPathPattern: /^\/orders\/create$/,
      },
    ],
  },
  {
    name: "Employee",
    items: [
      {
        name: "Manage Employees",
        path: "/employees",
        icon: <EngineeringTwoTone />,
        highlightPathPattern: /^\/employees(\/(edit|create))?$/,
      },
      {
        name: "Payment History",
        path: "/employees/payment-history",
        icon: <PaymentTwoTone />,
        highlightPathPattern:
          /^\/employees\/payment-history(\/(edit|create))?$/,
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
        highlightPathPattern: /^\/customers(\/(edit|create))?$/,
      },
      {
        name: "Payment History",
        path: "/customers/payment-history",
        icon: <PaymentTwoTone />,
        highlightPathPattern:
          /^\/customers\/payment-history(\/(edit|create))?$/,
      },
    ],
  },

  {
    name: "Product",
    items: [
      {
        name: "Manage Categories",
        path: "/categories",
        icon: <CategoryTwoTone />,
        highlightPathPattern: /^\/categories(\/.*)?$/,
      },

      {
        name: "Manage Products",
        path: "/products",
        icon: <InventoryTwoTone />,
        highlightPathPattern: /^\/products(\/(edit|create))?$/,
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
        highlightPathPattern: /^\/shops(\/(edit|create))?$/,
      },
    ],
  },
];
