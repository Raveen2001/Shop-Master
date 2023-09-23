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
        additionalPathPattern: "^/orders/(edit|create)$",
      },
      {
        name: "New Order",
        path: "/orders/new",
        icon: <NoteAddTwoTone />,
        additionalPathPattern: "^/orders/(edit|create)$",
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
        additionalPathPattern: "^/employees/(edit|create)$",
      },
      {
        name: "Payment History",
        path: "/employees/payment-history",
        icon: <PaymentTwoTone />,
        additionalPathPattern: "^/employees/payment-history/(edit|create)$",
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
        additionalPathPattern: "^/customers/(edit|create)$",
      },
      {
        name: "Payment History",
        path: "/customers/payment-history",
        icon: <PaymentTwoTone />,
        additionalPathPattern: "^/customers/payment-history/(edit|create)$",
      },
    ],
  },

  {
    name: "Product",
    items: [
      {
        name: "Manage Brands",
        path: "/brands",
        icon: <FitbitTwoTone />,
        additionalPathPattern: "^/brands/(edit|create)$",
      },
      {
        name: "Manage Categories",
        path: "/categories",
        icon: <CategoryTwoTone />,
        additionalPathPattern: "^/categories/(edit|create)$",
      },
      {
        name: "Manage Products",
        path: "/products",
        icon: <InventoryTwoTone />,
        additionalPathPattern: "^/products/(edit|create)$",
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
        additionalPathPattern: "^/cutomers/(edit|create)$",
      },
    ],
  },
];
