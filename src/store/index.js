import { createStore } from "vuex";
import mutations from "./mutations";
import getters from "./getters.js";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      /* 歌曲信息相关 */
      searchDefault: { real: "", show: "" },
      playList: [],
      /* 播放器相关 */
      isPlayerFull: false,
      autoPlay: true,
      currentSong: {},
      isPlaying: false,
      expectTime: 0,
      duration: -1,
      currentTime: 0
    };
  },
  getters,
  actions,
  mutations
});
export default store;
