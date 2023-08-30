import { TSchema, Type } from "@sinclair/typebox";

export const PagableSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    rows: Type.Array(schema),
    total: Type.Number(),
    page: Type.Optional(Type.Number()),
    limit: Type.Optional(Type.Number()),
  });
};

export const PagableQueryStringSchema = <T extends TSchema, V extends string>(
  schema: T,
  orderByCols: readonly V[]
) => {
  return Type.Intersect([
    schema,
    Type.Object({
      limit: Type.Optional(Type.Number()),
      page: Type.Optional(Type.Number()),
      order: Type.Optional(
        Type.Union([Type.Literal("asc"), Type.Literal("desc")])
      ),
      orderBy: Type.Optional(
        Type.Union(orderByCols.map((col) => Type.Literal(col)))
      ),
    }),
  ]);
};
