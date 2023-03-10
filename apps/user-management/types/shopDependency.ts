import { Type } from "@sinclair/typebox";

const ShopSchemaDependency = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  address: Type.String({ minLength: 3 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  email: Type.Optional(Type.String({ format: "email" })),
  website: Type.Optional(Type.String({ format: "uri" })),
  description: Type.String({ minLength: 3 }),
  image: Type.Array(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export default ShopSchemaDependency;
