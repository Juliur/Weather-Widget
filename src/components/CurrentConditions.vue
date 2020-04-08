<template>
    <div id="current-weather" v-if="weatherCache !== null">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-lg-8 col-sm-6">
            <p class="city-name font-weight-bold text-uppercase mb-0">{{ weatherCache.timezone | cityName }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <div class="daily-forecast">
              <span>
                <i class="fa fa-long-arrow-up" aria-hidden="true"></i> 
                {{Math.round(weatherCache.daily[0]["temp"]["max"])}}&#8451;
              </span>
              <span>
                <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                 {{Math.round(weatherCache.daily[0]["temp"]["min"])}} &#8451;
              </span>
            </div>
          </div> 
        </div>
      </div>

      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-md-3 col-4">
            <p class="current-day text-uppercase mb-0">{{ currentDay }}</p>
            <p class="current-date mb-0">{{ currentDate }}</p>
            <p class="mb-0">Wind {{weatherCache.current.wind_speed}} km/h</p>
            <p class="humidity-info"><i class="fa fa-tint" aria-hidden="true"></i>{{weatherCache.current.humidity}}%</p>
          </div>
          <div class="col-md-5 col-4">
            <div class="mx-auto icon-big"
                :class="getWeatherClass"
            ></div>
            <p class="weather-desc text-uppercase text-center mt-3">
              {{ weatherCache.current.weather[0]["description"]}}
            </p>
          </div>
          <div class="col-md-4 col-4">
            <div class="temp-wrap">
              <span class="current-temp">{{ Math.round(weatherCache.current.temp) }}</span>
              <span class="degree-symbol font-weight-bold">&#176;</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script> 
  import moment from 'moment';
  import store from '@/store.js'
  export default {
    name: "CurrentConditions",

    mounted(){
      store.dispatch("updateWeather");
    },

    filters:{
      cityName(timezone){
        let slashIndex = timezone.indexOf('/');
        let resultName = timezone.slice(slashIndex + 1);
        return resultName
      }
    },

    computed:{
      weatherCache:() => store.getters['getWeatherCache'],


      currentDay(){
      let day = moment().format('dddd');
      return day
      },

      currentDate(){
        let date =  moment().format('L')
        return date
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