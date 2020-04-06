import axios from "axios";
import {CURRENT_WEATHER} from "../constants";

const apiWeatherClient = axios.create({
    baseURL: CURRENT_WEATHER,
    headers: { 
        Accept: "application/json",
        "Content-Type": "application/json"
      },
  });

export default {
    getWeather() { // function will be used in store.js 
      return apiWeatherClient.get();
    }
};