import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import drawer from './modules/drawer';

const store = new Vuex.Store({
  modules: {
    drawer
  }
});

export default store;
