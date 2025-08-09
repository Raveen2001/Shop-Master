import { TEmployeeData } from "schema";
import { axiosClient } from "../utils/axios";

export const getEmployeeData = async () => {
  return axiosClient.get<TEmployeeData>("/employees");
};
