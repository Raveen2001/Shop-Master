import { ILoginData, ILoginSuccess } from "../pages/Login/model";
import { axiosClient } from "../utils/axios";

export const loginAsOwner = async (data: ILoginData) => {
  return axiosClient.post<ILoginSuccess>("/owners/login", data);
};

export const registerAsOwner = async (data: ILoginData) => {
  return axiosClient.post("/owners/register", data);
};
