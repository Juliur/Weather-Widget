<template>   
	<div id="weather-widget" class="container-fluid h-100 ">
		<div class="row align-items-center h-100">
			<div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12">
				<div class="row no-gutters">
					<div class="col-12">
						<CurrentConditions />
					</div>
					<div class="col-12">
						<FiveDaysForecast />
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>

<script>
	import CurrentConditions from "../components/CurrentConditions.vue";
  import FiveDaysForecast from "../components/FiveDaysForecast.vue";

	export default {
  name: 'Home',
  components: {
		CurrentConditions,
		FiveDaysForecast,
  }
}
</script>
