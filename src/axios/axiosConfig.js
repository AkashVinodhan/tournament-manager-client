import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tournament-server.onrender.com/api",
});

export default axiosInstance;
