import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      isPlayerFull: false,
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
