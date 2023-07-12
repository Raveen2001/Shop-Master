import { TSchema, Type } from "@sinclair/typebox";

export const PagableSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    rows: Type.Array(schema),
    total: Type.Number(),
  });
};
