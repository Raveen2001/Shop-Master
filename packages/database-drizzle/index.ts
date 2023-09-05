import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as ownersSchema from "./schema/owners";
import * as shopsSchema from "./schema/shops";

import * as employeesSchema from "./schema/employees";
import * as employeePaymentsSchema from "./schema/employee_payments";

import * as customersSchema from "./schema/customers";
import * as customerPaymentsSchema from "./schema/customer_payments";

import * as brandsSchema from "./schema/brands";
import * as productCategoriesSchema from "./schema/product_categories";
import * as productSubCategoriesSchema from "./schema/product_sub_categories";
import * as productsSchema from "./schema/products";
import * as productImagesSchema from "./schema/product_images";
import * as productSearchTagsSchema from "./schema/product_search_tags";
import * as productReviewsSchema from "./schema/product_reviews";
import * as productVariantsSchema from "./schema/product_variants";

if (!process.env.DATABASE_URL) {
  console.log("Database url is not available");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, {
  schema: {
    ...shopsSchema,
    ...ownersSchema,

    ...employeesSchema,
    ...employeePaymentsSchema,

    ...customersSchema,
    ...customerPaymentsSchema,

    ...brandsSchema,
    ...productCategoriesSchema,
    ...productSubCategoriesSchema,

    ...productsSchema,
    ...productVariantsSchema,
    ...productReviewsSchema,
    ...productImagesSchema,
    ...productSearchTagsSchema,
  },
  //   logger: true,
});

export default db;
export * from "./schema";
export * from "drizzle-orm";
