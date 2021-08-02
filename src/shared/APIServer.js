import axios from "axios";

const instance = axios.create({
  baseURL: "https://openinfo-api.herokuapp.com",
});

export default instance;
