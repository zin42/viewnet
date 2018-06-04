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


let cube;
// Deterministic loop:
function loop() {
  cube.rotation.z += 0.05;
}

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
    this.$nextTick(() => {
      // Build the Three.js scene:
      const geometry = new Three.BoxGeometry(1, 1, 1);
      const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new Three.Mesh(geometry, material);
      cube.name = 'myCube';
      this.ADD_SCENE(cube);
      setInterval(loop, 1000 / 60);
    });
  },
  methods: {
    ...mapMutations([
      'ADD_SCENE',
    ]),
    /* eslint-disable */
    getWindowWidth(e) {
    /* eslint-enable */
      this.windowWidth = document.documentElement.clientWidth;
    },
    /* eslint-disable */
    getWindowHeight(e) {
    /* eslint-enable */
      this.windowHeight = document.documentElement.clientHeight;
    },
  },
  computed: {
    ...mapState({
      three: state => state.three.scene,
    }),
  },
  router,
  store,
}).$mount('#app');
