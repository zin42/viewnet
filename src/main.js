import Vue from 'vue';
import VueRouter from 'vue-router';
import * as Three from 'three';
import { mapState, mapMutations } from 'vuex';
import store from '@/store';
// import App from './App.vue';
import Frame from './components/Frame.vue';
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
  render: h => h(Frame),
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    };
  },
  beforeMount() {
    window.addEventListener('resize', this.getWindowWidth);
    window.addEventListener('resize', this.getWindowHeight);
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
  },
  computed: {
  },
  router,
  store,
}).$mount('#app');
