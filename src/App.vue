<template>
  <div id="app">
    <div id="weather-widget" class="container-fluid h-100 ">
      <div class="row align-items-center h-100">
        <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12">
          <div class="row no-gutters">
            <div class="col-12">
              <currentConditions />
            </div>
            <div class="col-12">
              <fourDaysForecast />
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import currentConditions from "./components/currentConditions.vue";
  import fourDaysForecast from "./components/fourDaysForecast.vue"

export default {
  name: 'App',
  components: {
    currentConditions,
    fourDaysForecast,
  }
}
</script>

