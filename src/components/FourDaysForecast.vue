<template>
	<div id="weather-forecast" class="container-fluid" v-if="weatherCache !== null">
		<div class="row">
			<div class="col-md-5ths text-center text-center"
					v-for="day in weatherCache.daily.slice(1,6)" :key="day.dt">
					<p class="day">{{ day.dt | getDayFromDT }}</p>
					<p class="date">{{ day.dt | getDateFromDT }}</p>
					<!--div class="icon-sunny icon-small mx-auto mb-2"></div-->
					<p class="temp"> 
						{{Math.round(day.temp.max)}} /
						{{Math.round(day.temp.min)}} 
					</p>
				</div>
			</div>
	</div>
</template>

<script>
import store from '@/store.js';
import moment from 'moment';
	export default {
		name: "FourDayForecast",
		computed:{
      weatherCache:() => store.getters['getWeatherCache'],
		},

		filters:{
			getDayFromDT(dt){
				let day = moment.unix(dt).format("ddd");
				return day
			},
			getDateFromDT(dt){
				let date = moment.unix(dt).format("DD MMM");
				return date
			}
		}
	}

</script>