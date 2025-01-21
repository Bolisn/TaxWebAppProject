import axios from 'axios'; 
import { ACCESS_TOKEN } from './constants.js'; 

// Create an Axios instance which will be used for the HTML requests

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Set the base URL from the .env file
});

api.interceptors.request.use(         // this function modifies all outgoing requests to attach an Authorization header
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config; // Return the modified config to continue the request
  },
  (error) => {
    return Promise.reject(error); // Reject the promise if there's an error during the request
  }
);

export default api;
