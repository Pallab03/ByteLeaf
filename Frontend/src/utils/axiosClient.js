 import axios from "axios"
 
 const axiosClient =  axios.create({
     baseURL: 'https://byteleaf-backend.onrender.com',
     withCredentials: true, //attaced cookies
     headers: {
         'Content-Type': 'application/json'
     }
 });
 
 
 export default axiosClient;
 
