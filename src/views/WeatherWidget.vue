<template>   
	<div id="app" class="container-fluid h-100"
			:style="{ backgroundImage: 'url(' +  backgroundURL + ')' }"
	>
		<div class="row align-items-center h-100">
			<div class="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1 col-12">
				<div class="row no-gutters">	
					<div id="weather-widget">
						<CurrentConditions />
						<FiveDaysForecast />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import store from '@/store.js';
	import CurrentConditions from "../components/CurrentConditions.vue";
  import FiveDaysForecast from "../components/FiveDaysForecast.vue";

	export default {
  name: 'WeatherWidget',
  components: {
		CurrentConditions,
		FiveDaysForecast,
  },
	
	computed:{
		weatherCache:() => store.getters['getWeatherCache'],
		backgroundURL: () => store.getters['getURL'],
	},

}
</script>
