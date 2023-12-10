import axios from "axios";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;
if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const instance = axios.create({
  // baseURL: process.env.REACT_APP_TMDB_API_URL
  baseURL: apiURL
});

export default instance;