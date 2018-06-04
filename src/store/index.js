import Vue from 'vue';
import Vuex from 'vuex';

import three from './modules/three';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    three,
  },
  strict: true,
});
