<template>
  <div id="current-weather" v-if="weatherCache !== null">
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-10">
          <p class="city-name font-weight-bold mb-0">{{ chosenLocation.city }}, {{ chosenLocation.country }}</p>
          <p class="current-day-info mb-0">{{ currentDay }}, {{ currentDate }}</p>
          
        </div>
        <div class="col-2 text-right">
          <router-link to="/" class="settings-link ">
            <i class="fa fa-cog" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
  
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="row d-flex align-items-center h-100 no-gutters">
              <div class="col-6 d-flex">
                <div class="icon-big"
                    :class="getWeatherClass">
                </div>
              </div>
              <div class="col-6 d-flex flex-column">
                <div class="temp-wrap d-inline-flex justify-content-center">
                  <p class="current-temp mb-0">{{ Math.round(weatherCache.current.temp) }}</p>
                  <span class="degree-symbol font-weight-bold mb-0">{{ showUnitSymbol }} </span>
                </div>
                <p class="weather-desc text-capitalize text-center mb-0">
                  {{ weatherCache.current.weather[0]["description"]}}
                </p>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6">
            <div class="row h-100 align-content-between border-custom">
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">
                    {{Math.round(weatherCache.daily[0]["temp"]["max"])}}&#8451;
                  </span>
                  <p class="index-name mb-0 mt-0">High</p>
                </div>
              </div>
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">{{weatherCache.current.wind_speed}} km/h</span>
                  <p class="index-name mb-0">Wind speed</p> 
                </div>              
              </div>
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">{{weatherCache.current.humidity}}%</span>
                  <p class="index-name mb-0">Humidity</p>
                </div>
              </div>
              <div class="w-100"></div>
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">
                    {{Math.round(weatherCache.daily[0]["temp"]["min"])}} &#8451;
                  </span>
                  <p class="index-name mb-0 mt-auto">Low</p>
                </div>
              </div>
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">{{getWindDirection}}</span>
                  <p class="index-name mb-0">Wind direction</p>
                </div>
              </div>
              <div class="col">
                <div class="d-flex flex-column align-items-center my-4 my-lg-0">
                  <span class="index-number mb-2">{{getPressure}} mmHg</span>
                  <p class="index-name mb-0">Pressure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
  import moment from 'moment';
  import store from '@/store.js';
  export default {
    name: "CurrentConditions",

    mounted(){
      let locationData = JSON.parse(localStorage.getItem('chosenLocation'));
      let lon = locationData.coord.lon;
      let lat = locationData.coord.lat;
      let unit = JSON.parse(localStorage.getItem('selectedUnit'));
      store.dispatch("updateWeather", {lon, lat, unit});
      store.dispatch("chosenLocation");
      store.dispatch("selectedUnit");
    },

    computed:{
      weatherCache:() => store.getters['getWeatherCache'],
      chosenLocation: () => store.getters['getChosenLocation'],
      selectedUnit:() => store.getters['getSelectedUnit'],

      currentDay(){
      let day = moment().format('dddd');
      return day
      },

      currentDate(){
        let date =  moment().format('LL')
        return date
      },

      showUnitSymbol(){
        if(this.selectedUnit === "imperial"){
          return "F"
        }else if(this.selectedUnit === "metric"){
          return "°"
        }else return "K"
      },
      getPressure(){
        // 1 hPa = 0.75006375541921 mmHg
        const eq = 0.75006375541921;
        let prevData = this.weatherCache.current.pressure;
        let finalData = Math.round(prevData*eq);
        return finalData
      },
      getWindDirection(){
        let wind = this.weatherCache.current.wind_deg;
        switch(true){
          case wind >= 348.75 && wind < 11.25  : return "N";
          case wind >= 11.25  && wind < 33.75  : return "NNE";
          case wind >= 33.75  && wind < 56.25 : return "NE";
          case wind >= 56.25  && wind < 78.75 : return "ENE";
          case wind >= 78.75  && wind < 101.25 : return "E";
          case wind >= 101.25 && wind < 123.75 : return "ESE";
          case wind >= 123.75 && wind < 146.25 : return "SE";
          case wind >= 146.25 && wind < 168.75 : return "SSE"
          case wind >= 168.75 && wind < 191.25 : return "S";
          case wind >= 191.25 && wind < 213.75 : return "SSW";
          case wind >= 213.75 && wind < 236.25 : return "SW";
          case wind >= 236.25 && wind < 258.75 : return "WSW";
          case wind >= 258.75 && wind < 281.25 : return "W";
          case wind >= 281.25 && wind < 303.75 : return "WNW";
          case wind >= 303.75 && wind < 326.25 : return "NW";
          case wind >= 326.25 && wind < 348.75 : return "NNW";
          default : return "N/A"
        }
      },
      getWeatherClass(){
        if(this.weatherCache === null) return "no-icon" ;
        let weatherIcon = this.weatherCache.current.weather[0]["icon"];
        let weatherIconMap = {
          "01d" : "icon-sunny",
          "02d" : "icon-cloudy-sun",
          "03d" : "icon-cloudy",
          "04d" : "icon-cloudy",
          "09d" : "icon-showers",
          "10d" : "icon-showers-sun",
          "11d" : "icon-storm",
          "13d" : "icon-snow",
          "50d" : "icon-fog",
          "01n" : "icon-moon",
          "02n" : "icon-cloudy-moon",
          "03n" : "icon-cloudy",
          "04n" : "icon-cloudy",
          "09n" : "icon-showers",
          "10n" : "icon-showers-moon",
          "11n" : "icon-storm",
          "13n" : "icon-snow",
          "50n" : "icon-fog",
        }
        let result = weatherIconMap[weatherIcon];
        if(!weatherIconMap[weatherIcon]){
          result = "no-icon"
        }
        return result
      },
    }
  }
</script>