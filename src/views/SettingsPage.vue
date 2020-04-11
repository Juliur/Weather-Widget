<template>
	<div id="settings-page">
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

			<div v-show="chosenCity"
				class="chosen-city">
					<div>
						{{getChosenCity().city }} / {{getChosenCity().country }}
					</div>
					<button>Save changes</button>
			</div>

			<div class="matches-city-list list-group list-group-flush list-unstyled" v-if="matchesCities.length>0">
				<a 
					href="#" 
					class="list-group-item list-group-item-action list-group-item-custom"
					v-for="city in matchesCities" 
					:key="city.id"
					@click.prevent="chooseCity(city)">
					{{city.name}} / {{city.country}}
				</a>
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
				enteredCity: "",
				matchesCities: [],
				chosenCity: null,
			}
		},
		mounted() {
			if (localStorage.getItem('chosenCity')) {
				try {
					this.chosenCity = JSON.parse(localStorage.getItem('chosenCity'));
				}catch(error) {
					localStorage.removeItem('chosenCity');
				}
			}
		},
		methods:{
			async getCitiesArray(){
				if(!this.enteredCity) return;
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
			},

			chooseCity(city){
				this.chosenCity= city;
				this.saveChosenCity();
			},

			saveChosenCity(){
				const parsed = JSON.stringify(this.chosenCity);
				localStorage.setItem('chosenCity', parsed);
			},

			getChosenCity(){
				let result = JSON.parse(localStorage.getItem('chosenCity'));
				if(result === null){
					return {
						city: "No city selected",
						country: ""
					}
				}
				return {
					city:result.name, 
					country: result.country
				}
			}
		},
	}
</script>
