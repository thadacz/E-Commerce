import ProductReport from "../types/product-report";
import { axiosInstance } from "./http";

const ORDER_BASE_URL = "/api/order";

const orderApi = {
  getOrderTotalAmount: (customerId: number) => {
    return axiosInstance.get(
      `${ORDER_BASE_URL}/${customerId}/last-order-total-amount`
    );
  },

  getOrderReport: (customerId: number) => {
    return axiosInstance.get(`${ORDER_BASE_URL}/${customerId}/report`);
  },

  completeOrder: (customerId: number) => {
    return axiosInstance.put(`${ORDER_BASE_URL}/${customerId}/complete`);
  },

  createOrder: (customerId: number, formData: any) => {
    const deliveryData = {
      ...formData,
      customerId: customerId,
    };
    return axiosInstance.post(`${ORDER_BASE_URL}/${customerId}`, deliveryData);
  },

  getSalesView: (startDate: string, endDate: string) => {
    return axiosInstance.get<Array<ProductReport>>(`${ORDER_BASE_URL}/product-sales`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
};


export default orderApi;
