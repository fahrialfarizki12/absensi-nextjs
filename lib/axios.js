// lib/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.alfiagashop.biz.id/api/v1", // backend kamu
  withCredentials: true, // WAJIB biar cookie ke kirim & diterima
});

export default axiosClient;
