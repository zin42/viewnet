import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes/routes';


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});
// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
