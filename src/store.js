import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_URL, API_KEY} from "./constants";

Vue.use(Vuex); // tell Vue to action with Vuex

export default new Vuex.Store({
	state: {
		weatherCache: null,
	},

	mutations:{
		setWeatherCache(state, payload){
			state.weatherCache = payload;
		}
	},

	actions:{
		async updateWeather({commit}, coord){
			try {
				await axios({
					method: 'get',
					url: API_URL,
					params:{
						lat: coord.lat,
						lon: coord.lon,
						units: "metric",
						appid: API_KEY,
					}
				})
				.then((response)=>{
					commit('setWeatherCache', response.data);
					console.log(response)
				})
			}catch(error){
				console.log("City not found! ", error.response.statusText);
			}
		},
	},
	getters:{
		getWeatherCache(state) {
			return state.weatherCache
		}
	}
})


