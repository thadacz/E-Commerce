import { axiosInstance } from "./http";

const ORDER_RATING_BASE_URL = "/api/order-ratings";

export const getAllOrderRatings = () => {
  return axiosInstance.get(`${ORDER_RATING_BASE_URL}`);
};

export const getOrderRatingById = (orderRatingId: number) => {
  return axiosInstance.get(`${ORDER_RATING_BASE_URL}/${orderRatingId}`);
};

export const createOrderRating = (orderRatingData: any, userId: number) => {
  return axiosInstance.post(`${ORDER_RATING_BASE_URL}/${userId}`, orderRatingData);
};

export const updateOrderRating = (orderRatingId: number, orderRatingData: any) => {
  return axiosInstance.patch(
    `${ORDER_RATING_BASE_URL}/${orderRatingId}`,
    orderRatingData
  );
};

export const deleteOrderRating = (orderRatingId: number) => {
  return axiosInstance.delete(`${ORDER_RATING_BASE_URL}/${orderRatingId}`);
};
