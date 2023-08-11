import axios from "axios";

const API_URL = "http://localhost:8080/api/order";
const token = localStorage.getItem("token");

const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getOrderTotalAmount = (customerId: number) => {
  setAuthToken(token);

  return axios.get(`${API_URL}/${customerId}/last-order-total-amount`);
};

export const getOrderReport = (customerId: number) => {
  setAuthToken(token);

  return axios.get(`${API_URL}/${customerId}/report`);
};

export const completeOrder = (customerId: number) => {
  setAuthToken(token);

  return axios.put(`${API_URL}/${customerId}/complete`);
};


export const createOrder = (customerId: number, formData: any) => {
  const {
    firstName,
    lastName,
    companyName,
    streetAddress,
    city,
    department,
    zip,
    phone,
    emailAddress,
  } = formData;
  const deliveryData = {
    customerId: customerId,
    firstName: firstName,
    lastName: lastName,
    companyName: companyName,
    streetAddress: streetAddress,
    city: city,
    department: department,
    zip: zip,
    phone: phone,
    emailAddress: emailAddress,
  };
setAuthToken(token);

  return axios.post(`${API_URL}/${customerId}`, deliveryData);
};
