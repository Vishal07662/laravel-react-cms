import axios from "axios";
import appConfig from "../components/partials/Config";

// read token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const POSTS_API_URL = appConfig.API_URL + "/posts";

const postService = {

  getAll: async () => {
    const res = await axios.get(POSTS_API_URL, { headers: getAuthHeaders() });
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${POSTS_API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(POSTS_API_URL, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  update: async (id, data) => {
    data.append("_method", "PUT");
    const res = await axios.post(`${POSTS_API_URL}/${id}`, data, {
      headers: getAuthHeaders(),
    });

    return res.data;
  },

  togglePublish: async (id, data) => {
    const res = await axios.patch(`${POSTS_API_URL}/${id}/publish`, data, {
      headers: getAuthHeaders(),
    });

    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${POSTS_API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
};

export default postService;
