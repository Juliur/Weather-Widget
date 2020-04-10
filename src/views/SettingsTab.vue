<template>
	<div id="weather-widget" class="container-fluid h-100 ">
		<div class="row align-items-center h-100">
			<div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12">
				<div class="row no-gutters">
					<div class="col-12">
						<input 
							v-model="enteredCity"
							@keyup.enter="getCitiesArray"
							class="search-input"
							type="text" 
							placeholder="Enter your city..."/>
						<button
								type="submit"
								@click.prevent="getCitiesArray"
								class="search-btn text-uppercase font-weight-bold">
							<i class="fa fa-search" aria-hidden="true"></i>
						</button>

						<div class="city-variants" v-for="city in matchesCities" :key="city.id"> 
							<p>{{city.name}}</p>
						</div>
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
				matchesCities: [],
				cityCoordinates: {
					lat: null,
					lon: null,
				}
			}
		},
		methods:{
			async getCitiesArray(){
				try{
					await axios.get("/city.list.min.json")
					.then((response)=>{
						let citiesArray = response.data;
						this.matchesCities = citiesArray.filter(
							city => city.name.toLowerCase().startsWith(this.enteredCity.toLowerCase())
						);
						console.log(this.matchesCities)
						if(this.matchesCities.length === 0) {
							throw new Error("Array is empty!")
						}
					})
				} catch(error) {
						console.log(error)
					} 
			}
		}
	}
						// for(let city of response.data){
						// 	if(city.name.toLowerCase() === this.enteredCity.toLowerCase()){
						// 		console.log(this.enteredCity)
						// 		let lat = city.coord.lat;
						// 		let lon = city.coord.lon;
						// 		this.cityCoordinates.lat = lat;
						// 		this.cityCoordinates.lon = lon;
						// 		break
						// 	}
						// }
					// 	return axios({
					// 		method: 'get',
					// 		url: "https://api.openweathermap.org/data/2.5/onecall",
					// 		params:{
					// 			lat: this.cityCoordinates.lat,
					// 			lon: this.cityCoordinates.lon,
					// 			units: "metric",
					// 		appid: "4442e1e742eb4c424c00335c7acb087e",
					// 		}
					// 	})
					// })
					// .then((response)=>{
					// 	console.log(response.data)
					// })
					// .catch(error => console.log("City not found! ", error.response.statusText));
</script>