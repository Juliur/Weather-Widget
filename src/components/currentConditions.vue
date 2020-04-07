<template>
    <div id="current-weather">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-lg-8 col-sm-6">
            <p class="city-name font-weight-bold text-uppercase mb-0">{{ city }}</p>
          </div>
          <div class="col-lg-4 col-sm-6">
            <div class="daily-forecast">
              <span>
                <i class="fa fa-long-arrow-up" aria-hidden="true"></i> 
                {{ highestAndLowestTemp.highestTemp }} &#8451;
              </span>
              <span>
                <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                {{ highestAndLowestTemp.lowestTemp }} &#8451;
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
            <p class="mb-0">Wind {{windSpeed}} km/h</p>
            <p class="humidity-info"><i class="fa fa-tint" aria-hidden="true"></i>{{humidity}}%</p>
          </div>
          <div class="col-md-5 col-4">
            <div class="mx-auto icon-big"
                :class="getWeatherClass">
            </div>
            <p class="weather-desc text-uppercase text-center mt-3">{{ getWeatherDescription }}</p>
          </div>
          <div class="col-md-4 col-4">
            <div class="temp-wrap">
              <span class="current-temp">{{ temperature }}</span>
              <span class="degree-symbol font-weight-bold">&#176;</span>
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
         return this.$store.state.weather;
        }
        return null;
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
        let weatherIcon = this.weatherData.current.weather[0]["icon"];
        let weatherIconMap = {
          "01d": "icon-sunny",
        }
        //     2: "icon-partly-cloudy",
        //     3: "icon-partly-cloudy",
        //     4: "icon-partly-cloudy",
        //     5: "icon-partly-cloudy",
        //     6: "icon-partly-cloudy",
        //     7: "icon-cloudy",
        //     8: "icon-cloudy",
        //     11: "icon-fog",
        //     12: "icon-showers",
        //     13: "icon-cloudy-showers",
        //     14: "icon-cloudy-showers",
        //     15: "icon-storm",
        //     16: "icon-storm",
        //     17: "icon-storm",
        //     18: "icon-showers",
        //     29: "icon-rain-snow",
        //     32: "icon-windy",
        //     33: "icon-moon",
        //     34: "icon-moon",
        //     35: "icon-cloudy-moon",
        //     36: "icon-cloudy-moon",
        //     37: "icon-cloudy-moon",
        //     38: "icon-cloudy-moon",
        //     39: "icon-showers-moon",
        //     40: "icon-showers-moon",
        //     41: "icon-showers-moon",
        //     42: "icon-showers-moon",
        //     43: "icon-showers-moon",
        //     44: "icon-showers-moon",
        //   }
        let result = weatherIconMap[weatherIcon];
        if(!weatherIconMap[weatherIcon]){
          result = "no-icon"
        }
        return result
      },
      getWeatherDescription(){
        if(this.weatherData !== null){
          let desc = this.weatherData.current.weather[0]["description"];
          return desc
        }
       return "N/A"
      },
      temperature(){
        if(this.weatherData !== null){
          let temp = Math.round(this.weatherData.current.temp);
          return temp
        }
        return "N/A"
      },
      windSpeed(){
        if(this.weatherData !== null){
          let speed = Math.round(this.weatherData.current.wind_speed);
          return speed
        }
        return "N/A"
      },
      humidity(){
        if(this.weatherData !== null){
          let humidLevel = this.weatherData.current.humidity;
          return humidLevel
        }
        return "N/A"
      },
      highestAndLowestTemp(){
        if(this.weatherData !== null){
          let highestTemp = Math.floor(this.weatherData.daily[0].temp.max);
          let lowestTemp = Math.floor(this.weatherData.daily[0].temp.min);
          return {highestTemp, lowestTemp}
        }
        return "N/A"
      }       
    },
    created: function() {
      this.$store.dispatch("updateWeather"); // dispatch "updateWeather" when component is created
    }
  }
</script>