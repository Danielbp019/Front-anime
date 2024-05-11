//api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // Cambia esto a la URL base de tu API

export default {
  getAllAnimes() {
    return axios.get(`${BASE_URL}/animes`);
  },
  createAnime(animeData: any) {
    return axios.post(`${BASE_URL}/animes`, animeData);
  },
  updateAnime(id: number, animeData: any) {
    return axios.put(`${BASE_URL}/animes/${id}`, animeData);
  },
  deleteAnime(id: number) {
    return axios.delete(`${BASE_URL}/animes/${id}`);
  },
};
