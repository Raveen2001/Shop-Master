import { ILoginData } from "../pages/Login/model";

export const loginAsOwner = async (data: ILoginData) => {
  console.log("loginAsOwner", data);
  return data;
};
