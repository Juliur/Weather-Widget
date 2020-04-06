import Vue from 'vue'; //vue lib
import App from './App.vue'; //root component
import store from "./store";

Vue.config.productionTip = false //Установка false отключает предупреждение о работе в режиме разработки при запуске Vue.

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
