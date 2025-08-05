import { Static, TSchema, Type } from "@sinclair/typebox";

export const PagableSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    rows: Type.Array(schema),
    total: Type.Number(),
    page: Type.Optional(Type.Number()),
    limit: Type.Optional(Type.Number()),
  });
};

export const PagableQuerySchema = (orderByCols: readonly string[]) =>
  Type.Object({
    limit: Type.Optional(Type.Number()),
    page: Type.Optional(Type.Number()),
    order: Type.Optional(
      Type.Union([Type.Literal("asc"), Type.Literal("desc")])
    ),
    orderBy: Type.Optional(
      Type.Union(orderByCols.map((col) => Type.Literal(col)))
    ),
  });

export const IDNumberQueryParamSchema = Type.Object({
  id: Type.Number(),
});
export const IDStringQueryParamSchema = Type.Object({
  id: Type.String(),
});

export const PhoneQueryParamSchema = Type.Object({
  phone: Type.String(),
});

export type TIDNumberQueryParam = Static<typeof IDNumberQueryParamSchema>;
export type TIDStringQueryParam = Static<typeof IDStringQueryParamSchema>;
export type TPhoneQueryParam = Static<typeof PhoneQueryParamSchema>;
