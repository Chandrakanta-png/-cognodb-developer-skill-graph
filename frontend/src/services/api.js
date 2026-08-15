import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://backendforskillgraph-dev.ap-south-1.elasticbeanstalk.com/api";

export const healthCheck = async () => {
  const response = await axios.get(`${API_BASE_URL}/health/`);
  return response.data;
};

export const getDevelopers = async () => {
  const response = await axios.get(`${API_BASE_URL}/developers/`);
  return response.data;
};

export const getDeveloper = async (developerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/developers/${developerId}/`
  );

  return response.data;
};

export const getSkills = async () => {
  const response = await axios.get(`${API_BASE_URL}/skills/`);
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects/`);
  return response.data;
};

export const search = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search/`, {
    params: {
      q: query,
    },
  });

  return response.data;
};

export const getDeveloperGraph = async (developerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/graph/developer/${developerId}/`
  );

  return response.data;
};

export const getRecommendations = async (developerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/recommendations/${developerId}/`
  );

  return response.data;
};
