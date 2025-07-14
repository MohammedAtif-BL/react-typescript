import axios from "axios";
import { type FormData } from "../components/UserFormPage";

const API_BASE_URL = "http://localhost:8082/user";

export const addUser = async (data: FormData) => {
  return axios.post(`${API_BASE_URL}/add`, data); // http://localhost:8082/user/add
};

export const getAllUsers = () => {
  return axios.get(API_BASE_URL); // GET http://localhost:8082/user
};

export const deleteUser = async (id: number) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const getUserById = (id: number) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const updateUser = (id: number, data: FormData) => {
  return axios.put(`${API_BASE_URL}/${id}`, data);
};
