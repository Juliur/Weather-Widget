import Vue from 'vue';
import Router from 'vue-router';
import WeatherWidget from './views/WeatherWidget.vue';
import SettingsPage from './views/SettingsPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'settings',
      component: SettingsPage
    },
    {
      path: '/weather',
      name: 'weather',
      component: WeatherWidget
    }
  ]
})