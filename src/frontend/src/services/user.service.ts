import { axiosInstance } from "./http";
import IUser from "../types/user.types";

const USER_BASE_URL = "/api/users";

const userApi = {
  getAllUsers: () => {
    return axiosInstance.get<IUser[]>(`${USER_BASE_URL}`);
  },

  getUserById: (userId: number) => {
    return axiosInstance.get<IUser>(`${USER_BASE_URL}/${userId}`);
  },

  addUserAddress: (userId: number, address: any) => {
    return axiosInstance.post<void>(
      `${USER_BASE_URL}/${userId}/address`,
      address
    );
  },

  createUser: (userData: any) => {
    return axiosInstance.post<IUser>(`${USER_BASE_URL}`, userData);
  },

  updateUser: (userId: number, userData: any) => {
    return axiosInstance.patch<IUser>(`${USER_BASE_URL}/${userId}`, userData);
  },

  deleteUser: (userId: number) => {
    return axiosInstance.delete<void>(`${USER_BASE_URL}/${userId}`);
  },
  findUserByEmail: (email: string) => {
    return axiosInstance.get<Array<IUser>>(
      `${USER_BASE_URL}?email=${email}`
    );
  },
};

export default userApi;
