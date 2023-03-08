import { Type } from "@sinclair/typebox";
import { EMPLOYEE_TYPE } from "database";

const EmployeeSchemaDependency = Type.Object({
  id: Type.String(),
  username: Type.String({ minLength: 3, maxLength: 100 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  password: Type.String(),
  image: Type.Optional(Type.String({ format: "uri" })),
  email: Type.Optional(Type.String({ format: "email" })),
  address: Type.String({ minLength: 3 }),
  type: Type.String({ enum: Object.values(EMPLOYEE_TYPE) }),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export default EmployeeSchemaDependency;
