<template>
	<div class="row align-items-center h-100">
		<div class="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1 col-12">
			<div class="row no-gutters">	
				<div id="settings-page">
					<div class="col-12">
						<div class="header d-flex">
							<input 
								v-model="enteredLocation"
								@keyup.enter="getCitiesArray"
								class="search-input"
								type="text" 
								placeholder="Enter location"/>

								<transition name="fade">
									<button
										v-if="!searching"
										key="not-searching"
										type="submit"
										@click.prevent="getCitiesArray"
										class="search-btn text-uppercase font-weight-bold text-right">	
											<i class="fa fa-search fa-lg" aria-hidden="true"></i>
									</button>
									<button class="search-btn searching-status" v-else key="loading">
										<div class="spinner-ring"></div>
									</button>
								</transition>
						</div>

						<div class="matches-city-list list-group list-group-flush list-unstyled"
								v-if="matchesCities">
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

								<transition name="fade">
									<p v-if="error" class="error-msg">
										<i class="fa fa-times-circle" aria-hidden="true"></i>
										{{error}}
									</p>
								</transition>

								<p>
									Selected location: <span> {{ showChosenLocation().city }} / {{  showChosenLocation().country }} </span>
								</p>
								<div class="form-inline">
								<label for="selectUnit">Units:</label>
									<select 
										v-model="selectedUnit"
										@change="selectUnit($event)"
										class="custom-select" 
										id="selectUnit">
										<option value="metric">Celsius</option>
										<option value="default">Kelvin</option>
										<option value="imperial">Fahrenheit</option>
									</select>
								</div>
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
				error: "",
				enteredLocation: "",
				matchesCities: [],
				chosenLocation: null,
				selectedUnit: null,
				searching: false,
			}
		},
		mounted() {
			if (localStorage.getItem('chosenLocation') && 
					localStorage.getItem('selectedUnit')
				) {
				try {
					this.chosenLocation = JSON.parse(localStorage.getItem('chosenLocation'));
					this.selectedUnit = JSON.parse(localStorage.getItem('selectedUnit'));
				}catch(error) {
					localStorage.removeItem('chosenLocation');
					localStorage.removeItem('selectedLocation');
				}
			}
		},
		methods:{
			getCitiesArray(){
				this.searching = true;

				if(!this.enteredLocation){
					this.error = "No entered location";
					this.searching = false;
					return;
				}
				this.error = "";
				axios
					.get("/city.list.min.json")
					.then((response)=>{
						let citiesArray = response.data;
						this.matchesCities = citiesArray.filter(
							city => city.name.toLowerCase().startsWith(this.enteredLocation.toLowerCase())
						)
						if(this.matchesCities.length === 0){
							throw "Location not found!"
						}
						this.searching = false;
					})
					.catch((error)=>{
						this.error = error;
						this.searching = false;
					})
			},

			chooseLocation(city){
				this.chosenLocation = city;
				this.saveChosenLocation();
				this.matchesCities = [];
			},

			saveChosenLocation(){
				const parsed = JSON.stringify(this.chosenLocation);
				localStorage.setItem('chosenLocation', parsed);
			},

			selectUnit(event){
				this.selectedUnit = event.target.value;
				this.saveSelectedUnit();
			},

			saveSelectedUnit(){
				const parsedInits = JSON.stringify(this.selectedUnit);
				localStorage.setItem('selectedUnit', parsedInits);
			},

			showChosenLocation(){
				let result = JSON.parse(localStorage.getItem('chosenLocation'));
				let city = result.name;
				let country = result.country;
				return {city, country}
			},
		},
	}
</script>
