import { axiosInstance } from "./http";

const CATEGORY_BASE_URL = "/api/categories";

const categoryApi = {
  getAllCategories: () => {
    return axiosInstance.get(`${CATEGORY_BASE_URL}`);
  },

  getCategoryById: (categoryId: number) => {
    return axiosInstance.get(`${CATEGORY_BASE_URL}/${categoryId}`);
  },

  addCategory: (categoryData: any) => {
    return axiosInstance.post(`${CATEGORY_BASE_URL}`, categoryData);
  },

  updateCategory: (categoryId: number, categoryData: any) => {
    return axiosInstance.patch(
      `${CATEGORY_BASE_URL}/${categoryId}`,
      categoryData
    );
  },

  deleteCategory: (categoryId: number) => {
    return axiosInstance.delete(`${CATEGORY_BASE_URL}/${categoryId}`);
  },

  getCategoriesNames: () => {
    return axiosInstance.get(`${CATEGORY_BASE_URL}/names`);
  },

  findCategoryByName: (categoryName: string) => {
    return axiosInstance.get<Array<Category>>(
      `${CATEGORY_BASE_URL}?name=${categoryName}`
    );
  },
};

export default categoryApi;
