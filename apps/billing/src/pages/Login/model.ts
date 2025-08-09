import { loginAsEmployee } from "../../services/auth";

export interface ILoginData {
  email: string;
  password: string;
}

export type ILoginResponse = Awaited<ReturnType<typeof loginAsEmployee>>;

export interface ILoginSuccess {
  token: string;
}
