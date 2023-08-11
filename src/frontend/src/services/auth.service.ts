import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = async (username: string, password: string) => {
  const response = await axios
    .post(API_URL + "login", {
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
