import { Static, Type } from "@sinclair/typebox";

export const LoginWithEmailPropsSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export const LoginWithUsernamePropsSchema = Type.Object({
  username: Type.String({ minLength: 3 }),
  password: Type.String({ minLength: 8 }),
});

export const LoginTokenSchema = Type.Object({
  token: Type.String(),
});

export type TLoginWithEmailIn = Static<typeof LoginWithEmailPropsSchema>;
export type TLoginWithUsernameIn = Static<typeof LoginWithUsernamePropsSchema>;
