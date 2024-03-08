import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedEmoji: "😀"
  },

  getters: {
    getEmoji(state) {
      return state.selectedEmoji;
    }
  },

  mutations: {
    SET_EMOJI(state, emoji) {
      state.selectedEmoji = emoji;
    }
  },

  actions: {
    setEmoji({ commit }, emoji) {
      commit("SET_EMOJI", emoji);
    }
  }
});

export default store;
