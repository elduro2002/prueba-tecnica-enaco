import axios from "axios";

// Importando una variable de entorno
const baseURL = import.meta.env.VITE_BASEURL

export const gestorApi = axios.create({
    baseURL,
})