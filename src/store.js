import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from 'moment';
import {API_KEY_WEATHER, API_URL_WEATHER, API_KEY_BACKGROUND, API_URL_BACKGROUND} from "./constants";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		weatherCache: null,
		chosenLocation: null,
		selectedUnit: null,
		backgroundURL: "",
	},

	mutations:{
		setWeatherCache(state, payload){
			state.weatherCache = payload;
		},
		setChosenLocation(state, payload){
			state.chosenLocation = payload;
		},
		setSelectedUnit(state, payload){
			state.selectedUnit = payload;
		},
		setBackroundURL(state, payload){
			state.backgroundURL = payload;
		}
	},

	actions:{
		updateWeather({commit}, params){
			try {
				axios({
					method: 'get',
					url: API_URL_WEATHER,
					params:{
						lat: params.lat,
						lon: params.lon,
						units: params.unit,
						appid: API_KEY_WEATHER,
					}
				})
				.then((response)=>{
					let weatherDesc = response.data.current.weather[0]["main"],
						unixCurrent = response.data.current.dt;
						// unixSunrise = response.data.current.sunrise,
						// unixSunset = response.data.current.sunset,

					function dayTime(current){
						let currentTime = moment.unix(current).format("HH");
								// futureSunrise = moment.unix(sunrise).format("HH"),
								// futureSunset = moment.unix(sunset).format("HH");
						let morning = (currentTime >= 4 && currentTime <= 11),
								afternoon = (currentTime >= 12 && currentTime <= 16),
								evening = (currentTime >= 17 && currentTime <= 20),
								night = (currentTime >= 21 || currentTime <= 3);
						if(morning){
							return "morning"
						}else if(afternoon){
							return "day"
						}else if(evening){
							return "evening"
						}else if(night){
							return night
						}
					}
					
					let imgQuery = weatherDesc.toLowerCase() + "+" + dayTime(unixCurrent);
					commit('setWeatherCache', response.data);
					return imgQuery
				})
				.then((response)=>{
					return axios({
						method: 'get',
						url: API_URL_BACKGROUND,
						params:{
							key: API_KEY_BACKGROUND,
							q: response,
							image_type: "photo",
							pretty: "true",
							per_page: 5
						}
					})
				})
				.then((response)=>{
					console.log(response)
					let imageURL = response.data.hits[0]["largeImageURL"];
					commit('setBackroundURL', imageURL);
				})
			}catch(error){
				console.log(error);
			}
		},
		chosenLocation({commit}){
			let result = JSON.parse(localStorage.getItem('chosenLocation'));
			let city = result.name; 
			let country = result.country;
			commit('setChosenLocation', {city, country});
		},
		selectedUnit({commit}){
			let resultUnit = JSON.parse(localStorage.getItem('selectedUnit'));
			commit('setSelectedUnit', resultUnit)
		},
	},
	getters:{
		getWeatherCache(state) {
			return state.weatherCache
		},
		getChosenLocation(state){
			return state.chosenLocation
		},
		getSelectedUnit(state){
			return state.selectedUnit
		},
		getURL(state){
			return state.backgroundURL
		}
	},
	
	computed:{
		weatherDescription(){
			let prevDesc = this.weatherCache.current.weather[0]["description"];
			let finalDesc = prevDesc.replace(" ", "+")
			return finalDesc
		}
	}
})


