import {
  ADD_TO_PLAYLIST,
  SET_AUTOPLAY,
  SET_CURRENT_SONG,
  SET_FULL_PLAYER
} from "./mutations-types";
export default {
  [SET_CURRENT_SONG](state, payload) {
    state.currentSong = payload;
  },
  [ADD_TO_PLAYLIST](state, payload) {
    state.playList.push(payload);
  },
  [SET_AUTOPLAY](state, payload) {
    state.autoPlay = payload;
  },
  [SET_FULL_PLAYER](state, payload) {
    state.isPlayerFull = payload;
  }
};
