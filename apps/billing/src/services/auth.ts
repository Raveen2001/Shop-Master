import { ILoginData, ILoginSuccess } from "../pages/Login/model";
import { axiosClient } from "../utils/axios";

export const loginAsEmployee = async (data: ILoginData) => {
  return axiosClient.post<ILoginSuccess>("/employees/login", data);
};
