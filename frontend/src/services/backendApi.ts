import axios from 'axios';

const backendApi = axios.create({
    baseURL: 'http://localhost:3000', // Apenas o domínio do backend
});

export default backendApi;
