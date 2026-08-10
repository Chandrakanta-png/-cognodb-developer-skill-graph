import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const healthCheck = async () => {
  const response = await api.get("/health/");
  return response.data;
};

export const getDevelopers = async () => {
  const response = await api.get("/developers/");
  return response.data;
};

export const getDeveloper = async (id) => {
  const response = await api.get(`/developers/${id}/`);
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get("/skills/");
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects/");
  return response.data;
};

export default api;