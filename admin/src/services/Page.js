import axios from "axios";
import appConfig from "../components/partials/Config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const PAGES_API_URL = appConfig.API_URL + "/pages";

const pageService = {

  getAll: async () => {
    return (await axios.get(PAGES_API_URL, { headers:getAuthHeaders() })).data;
  },

  getById: async (id) => {
    return (await axios.get(`${PAGES_API_URL}/${id}`, { headers:getAuthHeaders() })).data;
  },

  create: async (data) => {
    return (await axios.post(PAGES_API_URL, data, { headers:getAuthHeaders() })).data;
  },

  update: async (id, data) => {
    data.append("_method", "PUT");
    return (await axios.post(`${PAGES_API_URL}/${id}`, data, { headers:getAuthHeaders() })).data;
  },
  togglePublish: async (id, data) => {
    const res = await axios.patch(`${PAGES_API_URL}/${id}/publish`, data, {
      headers: getAuthHeaders(),
    });

    return res.data;
  },

  delete: async (id) => {
    return (await axios.delete(`${PAGES_API_URL}/${id}`, { headers:getAuthHeaders() })).data;
  },

};

export default pageService;
