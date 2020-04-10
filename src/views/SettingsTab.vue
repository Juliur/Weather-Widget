<template>
	<div id="weather-widget" class="container-fluid h-100 ">
		<div class="row align-items-center h-100">
			<div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12">
				<div class="row no-gutters">
					<div class="col-12">
						<input 
							v-model="enteredCity"
							class="search-input"
							type="text" 
							placeholder="Enter your city..."/>
						<button
								type="submit"
								@click.prevent="getWeather"
								class="search-btn text-uppercase font-weight-bold">
							<i class="fa fa-search" aria-hidden="true"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>   
</template>

<script>
import axios from 'axios';

	export default {
		name: "SettingsTab",
		data(){
			return{
				enteredCity: "",
				cityCoordinates: {
					lat: null,
					lon: null,
				}
			}
		},
		methods:{
			getWeather(){
				axios.get("/city.list.min.json")
					.then((response)=>{
						for(let city of response.data){
							if(city.name === this.enteredCity){
								console.log(this.enteredCity)
								let lat = city.coord.lat;
								let lon = city.coord.lon;
								this.cityCoordinates.lat = lat;
								this.cityCoordinates.lon = lon;
								break
							}
						}
						return axios({
							method: 'get',
							url: "https://api.openweathermap.org/data/2.5/onecall",
							params:{
								lat: this.cityCoordinates.lat,
								lon: this.cityCoordinates.lon,
								units: "metric",
							appid: "4442e1e742eb4c424c00335c7acb087e",
							}
						})
					})
					.then((response)=>{
						console.log(response.data)
					})
			},
		},
	}
</script>