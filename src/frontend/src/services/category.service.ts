import Category from "../types/category.type";
import { axiosInstance } from "./http";

const CATEGORY_BASE_URL = "/api/categories";

export const getAllCategories = () => {
  return axiosInstance.get(`${CATEGORY_BASE_URL}`);
};

export const getCategoryById = (categoryId: number) => {
  return axiosInstance.get(`${CATEGORY_BASE_URL}/${categoryId}`);
};

export const addCategory = (categoryData: any) => {
  return axiosInstance.post(`${CATEGORY_BASE_URL}`, categoryData);
};

export const updateCategory = (categoryId: number, categoryData: any) => {
  return axiosInstance.patch(
    `${CATEGORY_BASE_URL}/${categoryId}`,
    categoryData
  );
};

export const deleteCategory = (categoryId: number) => {
  return axiosInstance.delete(`${CATEGORY_BASE_URL}/${categoryId}`);
};

export const getCategoriesNames = () => {
  return axiosInstance.get(`${CATEGORY_BASE_URL}/names`);
};

export const findByName = (categoryName: string) => {
  return axiosInstance.get<Array<Category>>(
    `${CATEGORY_BASE_URL}?name=${categoryName}`
  );
};
