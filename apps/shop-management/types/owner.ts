import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const OwnerSchema = Type.Object({
  id: Type.String(),
  name: Type.String({ minLength: 3, maxLength: 50 }),
  phone: Type.String({ format: "regex", pattern: "^\\d{1,3}\\s\\d{10}$" }), // prettier-ignore
  email: Type.String({ format: "email" }),
  password: Type.String({
    minLength: 8,
  }),
  image: Type.Optional(Type.String({ format: "uri" })),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

export const OwnerSchemaOut = Type.Omit(OwnerSchema, ["password"]);

export type TOwner = Static<typeof OwnerSchema>;
export type TOwnerIn = Omit<TOwner, "id" | "createdAt" | "updatedAt">;

export const CreateOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Create a new owner",
    body: Type.Omit(OwnerSchema, ["id", "createdAt", "updatedAt"]),
    response: {
      201: OwnerSchemaOut,
    },
  },
};
