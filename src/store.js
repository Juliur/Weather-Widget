import Vue from "vue";
import Vuex from "vuex";
// import service from "./services/service";

Vue.use(Vuex); // tell Vue to action with Vuex

export default new Vuex.Store({
    state: {
        weather: {
            currentConditions: {},
            dailyForecasts: {},
        },
        dataIsReceived: false,
    },

    // mutations: {
    //   UPDATE_WEATHER(state){
//         service.getCurrentConditions()
//         .then(response => {
//             state.weather.currentConditions = response.data[0];
//             state.dataIsReceived = true;
//         })
//         .catch((err)=>{
//             console.log("There is an error", err);
//             state.dataIsReceived = false;
//         })
//         service.getDailyForecast()
//         .then(response => {
//             state.weather.dailyForecasts = response.data.DailyForecasts[0];
//             console.log(state.weather)
//             state.dataIsReceived = true;
//         })
//         .catch((err)=>{
//             console.log("There is an error", err);
//             state.dataIsReceived = false;
//         })
//     }
    // },
    // actions: {
    //     updateWeather(context) {
    //       context.commit('UPDATE_WEATHER');
    //     }
    // }
})