import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      autoPlay: true,
      playList: [],
      currentSong: {}
    };
  },
  getters,
  actions,
  mutations
});
export default store;
