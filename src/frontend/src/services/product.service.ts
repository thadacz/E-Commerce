import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const token = localStorage.getItem("token");
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getAllProducts = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setAuthToken(token);

  return axios.get(API_URL);
};


export const getProductById = (productId: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setAuthToken(token);

  return axios.get(API_URL + '/' + productId);
};

export const addProduct = (productData: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setAuthToken(token); 

  return axios.post(API_URL , productData);
};

export const updateProduct = (productId: number, productData: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setAuthToken(token);

  return axios.patch(API_URL + '/' + productId, productData);
};

export const deleteProduct = (productId: number) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  setAuthToken(token);

  return axios.delete(API_URL + '/' + productId);
};
