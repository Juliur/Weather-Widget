import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {API_URL, API_KEY} from "./constants";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		weatherCache: null,
		chosenLocation: null,
	},

	mutations:{
		setWeatherCache(state, payload){
			state.weatherCache = payload;
		},
		setChosenLocation(state, payload){
			state.chosenLocation = payload;
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
		chosenLocation({commit}){
			let result = JSON.parse(localStorage.getItem('chosenLocation'));
			let city = result.name; 
			commit('setChosenLocation', city)
		}
	},
	getters:{
		getWeatherCache(state) {
			return state.weatherCache
		},
		getChosenLocation(state){
			return state.chosenLocation
		}
	},
})


