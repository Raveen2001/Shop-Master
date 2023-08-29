import { AxiosError } from "axios";

export type IRequestError = AxiosError<{
  error: string;
}>;
