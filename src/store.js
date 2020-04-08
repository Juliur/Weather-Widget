import Vue from "vue";
import Vuex from "vuex";
import service from "./services/service";

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
		async updateWeather({commit}){
			let prevData = await service.getForecastData();
			let finalData = prevData.data;
			commit('setWeatherCache', finalData);
		}
	},

	getters:{
		getWeatherCache(state) {
			return state.weatherCache
		}
	}
})