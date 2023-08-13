import { axiosInstance } from "./http";

const CART_BASE_URL = "/api/cart"; 

export const getCartTotalAmount = (customerId: number) => {
  return axiosInstance.get(`${CART_BASE_URL}/${customerId}/totalAmount`);
};

export const getCart = (customerId: number) => {
  return axiosInstance.get(`${CART_BASE_URL}/${customerId}`);
};

export const addProductToCart = (productId: number, customerId: number) => {
  return axiosInstance.post(`${CART_BASE_URL}/${customerId}/add/${productId}`);
};

export const decreaseProductQuantityInCart = (
  productId: number,
  customerId: number
) => {
  return axiosInstance.post(
    `${CART_BASE_URL}/${customerId}/decrease/${productId}`
  );
};

export const updateCart = (customerId: number, cartItems: any[]) => {
  return axiosInstance.patch(`${CART_BASE_URL}/${customerId}`, cartItems);
};

export const removeProductFromCart = (
  productId: number,
  customerId: number
) => {
  return axiosInstance.delete(
    `${CART_BASE_URL}/${customerId}/delete/${productId}`
  );
};

export const clearCart = (customerId: number) => {
  return axiosInstance.delete(`${CART_BASE_URL}/${customerId}/clear`);
};
