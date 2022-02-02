import axios from 'axios';

export const publicAxios = axios.create({
    baseURL:  /* 'http://loca.lhost:3000/local' || */'https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/'
})

export const protectedAxios = axios.create({
    baseURL:  /* 'http://localhost:3000/local' || */ 'https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/'
})
