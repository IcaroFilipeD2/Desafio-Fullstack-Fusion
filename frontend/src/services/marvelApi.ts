import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = '3da57c9ca3b5a4bd4000440271c7058c';
const privateKey = '0bdc140027e90a8b0552046d02a05cd5cae322b2'

const timestamp = new Date().getTime().toString();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(CryptoJS.enc.Hex);

const marvelApi = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
    params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
    },
});

export default marvelApi;