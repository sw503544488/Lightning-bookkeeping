import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {//data
    count: 0
  },

  mutations: {//methods
    increment(state, n: number) {
      state.count += n;
    }
  },
  // actions: {},
  // modules: {}
});
export default store;