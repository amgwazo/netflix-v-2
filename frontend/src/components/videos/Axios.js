import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL
});

export default instance;