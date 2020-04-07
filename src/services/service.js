import axios from "axios";
import {API_URL} from "../constants";

const apiRequest = axios.create({
  baseURL: API_URL,
  headers: { 
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });


export default {
  getForecastData() { // function will be used in store.js 
    return apiRequest.get();
  },
};