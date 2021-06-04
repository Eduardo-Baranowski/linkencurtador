import axios from "axios";

//9331f61cf380fb55590c945327708a28e3e48c55
// base url: https://api-ssl.bitly.com/v4/

export const key = '9331f61cf380fb55590c945327708a28e3e48c55';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api;