import axios from "axios";

const instance = axios.create({
  baseURL: `https://web-final-2022-be.vercel.app/`,
});

export default instance;
