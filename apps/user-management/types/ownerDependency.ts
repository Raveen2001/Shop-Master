import { Type } from "@sinclair/typebox";

const OwnerSchemaDependency = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  Image: Type.Optional(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export default OwnerSchemaDependency;
