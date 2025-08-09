import { loginAsEmployee } from "../../services/auth";

export interface ILoginData {
  username: string;
  password: string;
}

export type ILoginResponse = Awaited<ReturnType<typeof loginAsEmployee>>;

export interface ILoginSuccess {
  token: string;
}
