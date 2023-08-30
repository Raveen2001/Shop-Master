import { AxiosResponse } from "axios";
import { axiosClient } from "../utils/axios";
import { IOwnerData } from "../models/owner";

export const getOwnerByToken = (): Promise<AxiosResponse<IOwnerData>> => {
  const url = `/owners/me`;

  return axiosClient.get(url);
};
