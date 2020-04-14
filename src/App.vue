<template>
  <div id="app" class="container-fluid h-100"
  :style="{ backgroundImage: 'url(' +  backgroundURL + ')' }"
  >
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
import axios from 'axios';
import {API_URL_BACKGROUND, API_KEY_BACKGROUND} from '@/constants';

export default {
  name: 'App',
  data(){
    return{
      backgroundURL: "",
    }
  },
  mounted(){
    try {
      axios({
        method: 'get',
        url: API_URL_BACKGROUND,
        params:{
          key: API_KEY_BACKGROUND,
          q: "rain+morning",
          image_type: "photo",
          pretty: "true",
          per_page: 5
        }
      })
      .then((response)=>{
        let imageURL = response.data.hits[1]["largeImageURL"];
        this.backgroundURL = imageURL;
      })
    }catch(error){
      console.log(error);
    }
  }
}
</script>

