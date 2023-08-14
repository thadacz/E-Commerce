import { axiosInstance} from "./http";

const PRODUCT_BASE_URL = "/api/products";


export const getAllProducts = () => {
  return axiosInstance.get(`${PRODUCT_BASE_URL}`)
};

export const getProductById = (productId: number) => {
  return axiosInstance.get(`${PRODUCT_BASE_URL}/${productId}`);
};

export const addProduct = (productData: any) => {
  return axiosInstance.post(`${PRODUCT_BASE_URL}`, productData);
};

export const updateProduct = (productId: number, productData: any) => {
  return axiosInstance.patch(`${PRODUCT_BASE_URL}/${productId}`, productData);
};

export const deleteProduct = (productId: number) => {
  return axiosInstance.delete(`${PRODUCT_BASE_URL}/${productId}`);
};

export const getProductsByCategoryId = (categoryId: number) => {
  return axiosInstance.get(`${PRODUCT_BASE_URL}/category/${categoryId}`);
};
