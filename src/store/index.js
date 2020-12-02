import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },

  getters: {
    getCount(state) {
      return state.count;
    }
  },

  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

export default store;
