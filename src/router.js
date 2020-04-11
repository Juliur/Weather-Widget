import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SettingsPage from './views/SettingsPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: SettingsPage
    },
    {
        path: '/weather',
        name: 'weather',
        component: Home
      }
  ]
})