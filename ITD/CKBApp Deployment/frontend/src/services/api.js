import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_URL ||
    "https://dl529nfz-8000.euw.devtunnels.ms",
});

api.interceptors.request.use((config) => {
  if (!config.url.endsWith("/")) {
    config.url += "/";
  }
  return config;
});

export default api;
