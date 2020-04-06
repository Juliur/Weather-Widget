<template>
  <div id="weather-widget">
    <div class="current-weather">
      <div class="container">
        <div class="row">
          <div class="col-8">
            <p class="city-name font-weight-bold text-uppercase mb-0">{{city}}</p>
          </div>
          <div class="col-4">
            <p></p>
          </div> 
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-3">
            <p class="current-day text-uppercase mb-0">{{currentDay}}</p>
            <p class="current-date mb-0">{{currentDate}}</p>
            <p class="mb-0">Wind {{windSpeed}} km/h</p>
            <p class="humidity-info"><i class="fa fa-tint" aria-hidden="true"></i>{{humidity}}%</p>
          </div>
          <div class="col-5">
            <div class="mx-auto"
                :class="getWeatherClass">
            </div>
            <p class="text-uppercase text-center">{{getWeatherDescription}}</p>
          </div>
          <div class="col-4">
            <div class="temp-wrap">
              <span class="current-temp font-weight-bold">{{ temperature }}</span>
              <span class="degree-symbol font-weight-bold">&#176;</span>
            </div>
          </div>
        </div>
      </div>
  </div>   
  </div>
</template>

<script> 
  import moment from 'moment';
  export default {
    computed: {
      weatherData() {
        if(this.$store.state.dataIsReceived){
          return this.$store.state.weather
        } 
        return null// обеспечиваем доступ к хранилищу во всех дочерних компонентах через this.$store
      },
      city(){
        return "Kyiv"
      },
      currentDay(){
        let day = moment().format('dddd');
        return day
      },
      currentDate(){
        let date =  moment().format('DD/MM/YYYY')
        return date
      },
      getWeatherClass(){
        if(!this.$store.state.dataIsReceived) return "no-icon" ;
          let weatherIcon = this.weatherData.WeatherIcon;
          let weatherIconMap = {
            1: "icon-sunny",
            2: "icon-partly-cloudy",
            3: "icon-partly-cloudy",
            4: "icon-partly-cloudy",
            5: "icon-partly-cloudy",
            6: "icon-partly-cloudy",
            7: "icon-cloudy",
            8: "icon-cloudy",
            11: "icon-fog",
            12: "icon-showers",
            13: "icon-cloudy-showers",
            14: "icon-cloudy-showers",
            15: "icon-storm",
            16: "icon-storm",
            17: "icon-storm",
            18: "icon-showers",
            29: "icon-rain-snow",
            32: "icon-windy",
            33: "icon-moon",
            34: "icon-moon",
            35: "icon-cloudy-moon",
            36: "icon-cloudy-moon",
            37: "icon-cloudy-moon",
            38: "icon-cloudy-moon",
            39: "icon-showers-moon",
            40: "icon-showers-moon",
            41: "icon-showers-moon",
            42: "icon-showers-moon",
            43: "icon-showers-moon",
            44: "icon-showers-moon",
          }
          let result = weatherIconMap[weatherIcon];
          if(!weatherIconMap[weatherIcon]){
          result = "no-icon"
          }
        return result
      },
      getWeatherDescription(){
        if(this.weatherData){
          let desc = this.weatherData.WeatherText;
           return desc
        }
       return "N/A"
      },
      temperature(){
        if(this.weatherData){
          let temp = Math.floor(this.weatherData.Temperature.Metric.Value);
          return temp
        }
        return "N/A"
      },
      windSpeed(){
        if(this.weatherData){
          let speed = this.weatherData.Wind.Speed.Metric.Value;
          return speed
        }
        return "N/A"
      },
      humidity(){
        if(this.weatherData){
          let level = this.weatherData.RelativeHumidity;
          return level
        }
        return "N/A"
      }
    },
    created: function() {
      this.$store.dispatch("updateWeather"); // dispatch "updateWeather" when component is created
    }
  }
</script>