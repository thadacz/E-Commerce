import { axiosInstance } from "./http";

const CART_BASE_URL = "/api/cart";

const cartApi = {
  getCartTotalAmount: (customerId: number) => {
    return axiosInstance.get(`${CART_BASE_URL}/${customerId}/totalAmount`);
  },
  getCart: (customerId: number) => {
    return axiosInstance.get(`${CART_BASE_URL}/${customerId}`);
  },
  increaseCartQuantity: (productId: number, customerId: number) => {
    return axiosInstance.post(
      `${CART_BASE_URL}/${customerId}/add/${productId}`
    );
  },
  decreaseCartQuantity: (productId: number, customerId: number) => {
    return axiosInstance.post(
      `${CART_BASE_URL}/${customerId}/decrease/${productId}`
    );
  },
  updateCart: (customerId: number, cartItems: any[]) => {
    return axiosInstance.patch(`${CART_BASE_URL}/${customerId}`, cartItems);
  },
  removeFromCart: (productId: number, customerId: number) => {
    return axiosInstance.delete(
      `${CART_BASE_URL}/${customerId}/delete/${productId}`
    );
  },
  clearCart: (customerId: number) => {
    return axiosInstance.delete(`${CART_BASE_URL}/${customerId}/clear`);
  },
};

export default cartApi;
