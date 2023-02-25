import { Static, Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const OwnerSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  phone: Type.String(),
  email: Type.String(),
  password: Type.String(),
  image: Type.Optional(Type.String()),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date" }),
});

export type TOwner = Static<typeof OwnerSchema>;
export type TOwnerIn = Omit<TOwner, "id" | "createdAt" | "updatedAt">;
export type TOwnerOut = Omit<TOwner, "password">;

export const CreateOwnerOpts: RouteShorthandOptions = {
  schema: {
    tags: ["Owner"],
    summary: "Create a new owner",
    body: Type.Omit(OwnerSchema, ["id", "createdAt", "updatedAt"]),
    response: {
      201: Type.Omit(OwnerSchema, ["password"]),
    },
  },
};
