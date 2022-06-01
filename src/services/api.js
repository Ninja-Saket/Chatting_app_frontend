import axios from "axios";
import store from "../store";
import { logout } from "../store/actions/auth";

const API = axios.create({
  baseURL: "https://secure-your-chat.herokuapp.com",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }
    console.log(err);
    if (typeof err.response.data.err.name !== "undefined") {
      if (err.response.data.err.name === "TokenExpiredError") {
        store.dispatch(logout());
        throw err;
      }
    }
  }
);
export default API;
