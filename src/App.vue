<template>
  <div id="app" class="container-fluid h-100">
    <div class="row align-items-center h-100">
			<div class="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1 col-12">
				<div class="row no-gutters">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

