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
  getForecastData() {
    return apiRequest.get();
  },
};