<template>   
	<div id="app" class="container-fluid"
			:style="{ backgroundImage: 'url(' +  backgroundURL + ')' }"
	>
		<div class="row align-items-center h-100">
			<div class="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1 col-12">
				<div class="row">	
					<div id="weather-widget">
						<CurrentConditions />
						<SixDaysForecast />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import store from '@/store.js';
	import CurrentConditions from "../components/CurrentConditions.vue";
  import SixDaysForecast from "../components/SixDaysForecast.vue";

	export default {
  name: 'WeatherWidget',
  components: {
		CurrentConditions,
		SixDaysForecast,
  },
	
	computed:{
		weatherCache:() => store.getters['getWeatherCache'],
		backgroundURL: () => store.getters['getURL'],
	},

}
</script>
