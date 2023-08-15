import IProduct from "../types/product.type";
import { axiosInstance } from "./http";

const PRODUCT_BASE_URL = "/api/products";

const productApi = {
  getAllProducts: () => {
    return axiosInstance.get(`${PRODUCT_BASE_URL}`);
  },

  getProductById: (productId: number) => {
    return axiosInstance.get(`${PRODUCT_BASE_URL}/${productId}`);
  },

  addProduct: (productData: FormData) => {
    return axiosInstance.post(`${PRODUCT_BASE_URL}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProduct: (productId: number, productData: any) => {
    return axiosInstance.patch(`${PRODUCT_BASE_URL}/${productId}`, productData);
  },

  deleteProduct: (productId: number) => {
    return axiosInstance.delete(`${PRODUCT_BASE_URL}/${productId}`);
  },

  getProductsByCategoryId: (categoryId: number) => {
    return axiosInstance.get(`${PRODUCT_BASE_URL}/category/${categoryId}`);
  },

  findByName: (productName: string) => {
    return axiosInstance.get<Array<IProduct>>(
      `${PRODUCT_BASE_URL}?name=${productName}`
    );
  },
};

export default productApi;
