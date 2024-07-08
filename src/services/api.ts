import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API_URL = {
  NEGARA: 'negaras',
  PELABUHAN: 'pelabuhans',
  BARANG: 'barangs',
};

export default api;
