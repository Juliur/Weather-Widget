import Vue from "vue";
import Vuex from "vuex";
import service from "./services/service";

Vue.use(Vuex); // tell Vue to action with Vuex

export default new Vuex.Store({
    state: {
        weather: {},
        dataIsReceived: false,
    },

    mutations: {
        UPDATE_WEATHER(state){
            service.getWeather()
            .then(response => {
                state.weather = response.data[0];
                state.dataIsReceived = true;
            })
            .catch((err)=>{
                console.log("There is an error", err);
                state.dataIsReceived = false;
            })
        }
    },
    actions: {
        updateWeather(context) {
          context.commit('UPDATE_WEATHER');
        }
      }
})