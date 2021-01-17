import Vuex from "vuex";
import Vue from "vue";
import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";
Vue.use(Vuex);

const state = {
  autoPlay: false,
  playList: [],
  currentSong: {}
};
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
export default store;
