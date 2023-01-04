import axios from "axios";

const instance = axios.create({
  baseURL: `https://wpfinal.vercel.app/`,
});

export default instance;
