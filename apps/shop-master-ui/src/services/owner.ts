import { AxiosResponse } from "axios";
import { axiosClient } from "../utils/axios";

export const getOwnerByToken = (): Promise<AxiosResponse<IOwnerData>> => {
  const url = `/owner/me`;

  return axiosClient.get(url);
};
