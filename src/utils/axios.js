import axios from 'axios';

 

export const http = axios.create({
    baseURL:'https://pokeapi.co/api/v2/',
    timeout:3000
});

export const httpWithoutUrl = axios.create({
    baseURL: "",
    timeout: 3000,
  });

