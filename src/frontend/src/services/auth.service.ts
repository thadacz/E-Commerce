import { axiosInstance, setAuthToken } from "./http";

const AUTH_BASE_PATH = "/api/auth/";

const authApi = {
  register: (
      firstName: string,
      lastName: string,
      email: string,
      password: string
  ) => {
    return axiosInstance.post(`${AUTH_BASE_PATH}register`, {
      firstName,
      lastName,
      email,
      password,
    });
  },

  login: async (username: string, password: string) => {
    const response = await axiosInstance.post(`${AUTH_BASE_PATH}login`, {
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
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

export default authApi;