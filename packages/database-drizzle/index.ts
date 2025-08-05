import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as OwnersSchema from "./schema/owners";
import * as ShopsSchema from "./schema/shops";

import * as EmployeesSchema from "./schema/employees";
import * as EmployeePaymentsSchema from "./schema/employee_payments";

import * as CustomersSchema from "./schema/customers";
import * as CustomerPaymentsSchema from "./schema/customer_payments";

import * as ProductCategoriesSchema from "./schema/product_categories";
import * as ProductsSchema from "./schema/products";
import * as ProductImagesSchema from "./schema/product_images";
import * as ProductSearchTagsSchema from "./schema/product_search_tags";
import * as ProductReviewsSchema from "./schema/product_reviews";
import * as ProductVariantsSchema from "./schema/product_variants";

import * as OrdersSchema from "./schema/orders";
import * as OrderItemsSchema from "./schema/order_items";

if (!process.env.DATABASE_URL) {
  console.log("Database url is not available");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, {
  schema: {
    ...ShopsSchema,
    ...OwnersSchema,

    ...EmployeesSchema,
    ...EmployeePaymentsSchema,

    ...CustomersSchema,
    ...CustomerPaymentsSchema,

    ...ProductCategoriesSchema,
    ...ProductsSchema,
    ...ProductVariantsSchema,
    ...ProductReviewsSchema,
    ...ProductImagesSchema,
    ...ProductSearchTagsSchema,

    ...OrdersSchema,
    ...OrderItemsSchema,
  },
  //   logger: true,
});

export * from "./schema";
export * from "drizzle-orm";
