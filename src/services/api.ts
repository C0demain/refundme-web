import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL base da API
  headers: {
    "Content-Type": "application/json",
    'Client-Type': 'web' // esse header vai servir para o backend identificar de de onde vem a requisição
  },
});

// Interceptor para incluir token
api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para lidar com erro de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("authToken"); // Remove token inválido
      //window.location.href = "/login"; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
