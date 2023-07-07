import { ILoginData } from "../pages/Login/model";
import { axiosClient } from "../utils/axios";

export const loginAsOwner = async (data: ILoginData) => {
  return axiosClient.post("/owner/login", data);
};
