import { Type } from "@sinclair/typebox";

export const StatusCode401 = Type.Object({
  statusCode: Type.Literal(401),
  error: Type.Literal("Unauthorized"),
  message: Type.String({ default: "The given credentials don't match" }),
});

export const StatusCode403 = Type.Object({
  statusCode: Type.Literal(403),
  error: Type.Literal("Forbidden"),
  message: Type.String({
    default: "You don't have permission to access this resource",
  }),
});

export const StatusCode404 = Type.Object({
  statusCode: Type.Literal(404),
  error: Type.Literal("Not Found"),
  message: Type.String({ default: "The requested resource was not found" }),
});

export const StatusCode422 = Type.Object({
  statusCode: Type.Literal(422),
  error: Type.Literal("Unprocessable Entity"),
  message: Type.String({ default: "The given data was invalid" }),
});
