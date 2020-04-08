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
    // mutations: {
    //   UPDATE_WEATHER(state){
    //     service.getForecastData()
    //     .then(response => {
    //         if(response.statusText === "OK"){
    //             state.weather = response.data;
    //             state.dataIsReceived = true;
    //         }
            
    //         // for(let i = 0; i < response.data.list.length; i+=8){
    //         //     state.weather.dailyForecasts.push(response.data.list[i]);
    //         // console.log(response)
           
    //     })
    //     .catch((err)=>{
    //         console.log("There is an error", err);
    //         state.dataIsReceived = false;
    //     })
    // }
    // },
    // actions: {
    //     updateWeather(context) {
    //       context.commit('UPDATE_WEATHER');
    //     }
    // }
})