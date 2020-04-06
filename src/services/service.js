import axios from "axios";
import {CURRENT_CONDITIONS, DAILY_FORECAST} from "../constants";

const currentConditions= axios.create({
  baseURL: CURRENT_CONDITIONS,
  headers: { 
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });

const dailyForecast = axios.create({
  baseURL: DAILY_FORECAST,
  headers: { 
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

export default {
  getCurrentConditions() { // function will be used in store.js 
    return currentConditions.get();
  },
  getDailyForecast(){
    return dailyForecast.get();
  }
};