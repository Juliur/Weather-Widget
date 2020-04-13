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
						Selected location: <span> {{getChosenLocation().city }} / {{getChosenLocation().country }} </span>
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
						console.log(this.matchesCities)
						if(this.matchesCities.length === 0) {
							throw new Error("Array is empty!")
						}
					})
				} catch(error) {
						console.log(error)
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

			getChosenLocation(){
				let result = JSON.parse(localStorage.getItem('chosenLocation'));
				if(result === null){
					return {
						city: "No location",
						country: ""
					}
				}
				return {
					city:result.name, 
					country: result.country
				}
			}
		},
		// computed:{
		// 	showingMatchesCityList(){
		// 		return true
		// 	}
		// }
	}
</script>
