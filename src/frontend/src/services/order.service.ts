import { axiosInstance } from "./http";

const ORDER_BASE_URL = "/api/order";

export const getOrderTotalAmount = (customerId: number) => {
  return axiosInstance.get(
    `${ORDER_BASE_URL}/${customerId}/last-order-total-amount`
  );
};

export const getOrderReport = (customerId: number) => {
  return axiosInstance.get(`${ORDER_BASE_URL}/${customerId}/report`);
};

export const completeOrder = (customerId: number) => {
  return axiosInstance.put(`${ORDER_BASE_URL}/${customerId}/complete`);
};

export const createOrder = (customerId: number, formData: any) => {
  const deliveryData = {
    ...formData,
    customerId: customerId,
  };
  return axiosInstance.post(`${ORDER_BASE_URL}/${customerId}`, deliveryData);
};

export const salesView = (() => {
  return axiosInstance.get(`${ORDER_BASE_URL}/product-sales`);
})
