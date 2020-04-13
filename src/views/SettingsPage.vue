<template>
	<div id="settings-page">
		<div class="col-12">
			<div class="header d-flex">
				<input 
					v-model="enteredLocation"
					@keyup.enter="getCitiesArray"
					class="search-input"
					type="text" 
					placeholder="Enter location"/>

				<button
						type="submit"
						@click.prevent="getCitiesArray"
						class="search-btn text-uppercase font-weight-bold text-right">
					<i class="fa fa-search" aria-hidden="true"></i>
				</button>
			</div>

			<div class="matches-city-list list-group list-group-flush list-unstyled" 
						v-if="matchesCities.length>0">
				<a 
					href="#" 
					class="list-group-item list-group-item-action list-group-item-custom"
					v-for="city in matchesCities" 
					:key="city.id"
					@click.prevent="chooseLocation(city)">
					{{city.name}} / {{city.country}}
				</a>
			</div>
			<div v-if="chosenLocation !== null"
					class="footer">
					<p>
						Selected location: <span> {{ showChosenLocation().city }} / {{  showChosenLocation().country }} </span>
					</p>
					<div class="d-flex justify-content-center">
						<div class="show-weather-btn d-flex justify-content-center align-items-center">
							<router-link to="/weather" class="text-uppercase font-weight-bold">
								Show weather
							</router-link>
						</div>
					</div>		
				</div>	
			</div>
			
	</div>

</template>

<script>
	import axios from 'axios';

	export default {
		name: "SettingsPage",
		data(){
			return{
				enteredLocation: "",
				matchesCities: [],
				chosenLocation: null,
			}
		},
		mounted() {
			if (localStorage.getItem('chosenLocation')) {
				try {
					this.chosenLocation = JSON.parse(localStorage.getItem('chosenLocation'));
				}catch(error) {
					localStorage.removeItem('chosenLocation');
				}
			}
		},
		methods:{
			async getCitiesArray(){
				if(!this.enteredLocation) return;
				try{
					await axios.get("/city.list.min.json")
					.then((response)=>{
						let citiesArray = response.data;
						this.matchesCities = citiesArray.filter(
							city => city.name.toLowerCase().startsWith(this.enteredLocation.toLowerCase())
						);
						if(this.matchesCities.length === 0) {
							throw new Error("Array is empty!")
						}
					})
				} catch(error) {
						console.log(error)
						return "Location not found"
					} 
			},

			chooseLocation(city){
				this.chosenLocation = city;
				this.saveChosenLocation();
			},

			saveChosenLocation(){
				const parsed = JSON.stringify(this.chosenLocation);
				localStorage.setItem('chosenLocation', parsed);
			},
			showChosenLocation(){
				let result = JSON.parse(localStorage.getItem('chosenLocation'));
				let city = result.name;
				let country = result.country;
				return {city, country}
			}
		},
	}
</script>
