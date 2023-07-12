import { AxiosError } from "axios";

export type IRequestError = AxiosError<{
  message: string;
}>;
