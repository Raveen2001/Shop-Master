import { loginAsOwner } from "../../services/auth";

export interface ILoginData {
  email: string;
  password: string;
}

export type ILoginResponse = Awaited<ReturnType<typeof loginAsOwner>>;

export interface ILoginSuccess {
  token: string;
}
