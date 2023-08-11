import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";
const token = localStorage.getItem("token");

const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getCartTotalAmount = (customerId: number) => {
  setAuthToken(token);
  return axios.get(`${API_URL}/${customerId}/totalAmount`);
};

export const getCart = (customerId: number) => {
  setAuthToken(token);

  return axios.get(`${API_URL}/${customerId}`);
};

export const addProductToCart = (productId: number, customerId: number) => {
  setAuthToken(token);

  return axios.post(`${API_URL}/${customerId}/add/${productId}`);
};

export const decreaseProductQuantityInCart = (
  productId: number,
  customerId: number
) => {
  setAuthToken(token);

  return axios.post(`${API_URL}/${customerId}/decrease/${productId}`);
};

export const updateCart = (customerId: number, cartItems: any[]) => {
  setAuthToken(token); 

  return axios.patch(`${API_URL}/${customerId}`, cartItems);
};

export const removeProductFromCart = (
  productId: number,
  customerId: number
) => {
  setAuthToken(token);

  return axios.delete(`${API_URL}/${customerId}/delete/${productId}`);
};

export const clearCart = (customerId: number) => {
  setAuthToken(token);

  return axios.delete(`${API_URL}/${customerId}/clear`);
};
