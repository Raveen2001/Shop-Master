import { Type } from "@sinclair/typebox";

export const optionalType = (type: any) => {
  return Type.Optional(Type.Union([type, Type.Null()]));
};
