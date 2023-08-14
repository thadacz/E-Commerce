import { axiosInstance } from "./http";

const BLOB_BASE_URL = "/api/blob";

export const uploadFile = (file: string | Blob) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`${BLOB_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
