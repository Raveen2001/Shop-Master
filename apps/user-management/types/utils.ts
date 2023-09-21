import { Type } from "@sinclair/typebox";

export const optionalType = (type: any) => {
  return Type.Optional(Type.Union([Type.Null(), type]));
};
