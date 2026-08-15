import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://backendforskillgraph-dev.ap-south-1.elasticbeanstalk.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("skillgraph_access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
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

export const register = async (payload) => {
  const response = await api.post("/auth/register/", payload);
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login/", { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};

export const updateCurrentUser = async (payload) => {
  const response = await api.patch("/auth/me/", payload);
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await api.patch("/auth/profile/", payload);
  return response.data;
};

export default api;
