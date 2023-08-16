import { axiosInstance } from "./http";

const ORDER_RATING_BASE_URL = "/api/order-ratings";

const orderRatingApi = {
  getAllOrderRatings: () => {
    return axiosInstance.get(`${ORDER_RATING_BASE_URL}`);
  },

  getOrderRatingById: (orderRatingId: number) => {
    return axiosInstance.get(`${ORDER_RATING_BASE_URL}/${orderRatingId}`);
  },

  createOrderRating: (orderRatingData: any, userId: number) => {
    return axiosInstance.post(
      `${ORDER_RATING_BASE_URL}/${userId}`,
      orderRatingData
    );
  },

  updateOrderRating: (orderRatingId: number, orderRatingData: any) => {
    return axiosInstance.patch(
      `${ORDER_RATING_BASE_URL}/${orderRatingId}`,
      orderRatingData
    );
  },

  deleteOrderRating: (orderRatingId: number) => {
    return axiosInstance.delete(`${ORDER_RATING_BASE_URL}/${orderRatingId}`);
  },
};

export default orderRatingApi;
