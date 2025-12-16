// lib/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-v2.alfiagashop.biz.id/api/v1", // backend kamu
  withCredentials: true, // WAJIB biar cookie ke kirim & diterima
});

export default axiosClient;
