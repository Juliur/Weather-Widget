import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SettingsTab from './views/SettingsTab.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsTab
      }
  ]
})