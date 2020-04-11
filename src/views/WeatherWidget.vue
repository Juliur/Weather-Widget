<template>   	
	<div id="weather-widget">
		<div class="col-12">
			<CurrentConditions />
		</div>
		<div class="col-12">
			<FiveDaysForecast />
		</div>
	</div>
</template>

<script>
	import CurrentConditions from "../components/CurrentConditions.vue";
  import FiveDaysForecast from "../components/FiveDaysForecast.vue";

	export default {
  name: 'WeatherWidget',
  components: {
		CurrentConditions,
		FiveDaysForecast,
  }
}
</script>
