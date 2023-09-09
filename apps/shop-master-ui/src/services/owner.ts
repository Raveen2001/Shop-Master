import { AxiosResponse } from "axios";
import { axiosClient } from "../utils/axios";
import { TOwnerData } from "../models/owner";

export const getOwnerByToken = (): Promise<AxiosResponse<TOwnerData>> => {
  const url = `/owners/me`;

  return axiosClient.get(url);
};
