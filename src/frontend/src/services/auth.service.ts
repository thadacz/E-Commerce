
import { axiosInstance, setAuthToken } from "./http";

const AUTH_BASE_PATH = "/api/auth/";
const AUTH_REGISTER_PATH = `${AUTH_BASE_PATH}register`;
const AUTH_LOGIN_PATH = `${AUTH_BASE_PATH}login`;
const AUTH_USER_PATH = `${AUTH_BASE_PATH}user`;


export const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return axiosInstance.post(AUTH_REGISTER_PATH, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = async (username: string, password: string) => {
  const response = await axiosInstance.post(AUTH_LOGIN_PATH, {
    username,
    password,
  });
  if (response.data.token) {
    const token = response.data.token;
    console.log(token);
    setAuthToken(token);
    localStorage.setItem("user", JSON.stringify(response.data.userDTO));
    localStorage.setItem("token", token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setAuthToken(null);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};
