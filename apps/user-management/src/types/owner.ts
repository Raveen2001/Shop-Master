import { Static, Type } from "@sinclair/typebox";
import { EmployeeSchema } from "./employee.js";
import { ShopSchema } from "./shop.js";
import { optionalType } from "./utils.js";

export const OwnerSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 8,
  }),
  image: optionalType(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export type TOwner = Static<typeof OwnerSchema>;

export const OwnerSchemaWithoutPassword = Type.Omit(OwnerSchema, ["password"]);
export type TOwnerWithoutPassword = Static<typeof OwnerSchemaWithoutPassword>;

export const OwnerSchemaIn = Type.Omit(OwnerSchema, [
  "id",
  "createdAt",
  "updatedAt",
]);
export type TOwnerIn = Static<typeof OwnerSchemaIn>;
