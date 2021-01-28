import {
  ADD_TO_PLAYLIST,
  SET_AUTOPLAY,
  SET_CURRENT_SONG,
  SET_FULL_PLAYER,
  SET_PLAYING,
  SET_PLAY_TIME,
  SET_DURATION,
  SET_CURRENT_TIME
} from "./mutations-types";
export default {
  [ADD_TO_PLAYLIST](state, payload) {
    state.playList.push(payload);
  },
  [SET_CURRENT_SONG](state, payload) {
    state.currentSong = payload;
  },
  [SET_PLAYING](state, payload) {
    state.isPlaying = payload;
  },
  [SET_AUTOPLAY](state, payload) {
    state.autoPlay = payload;
  },
  [SET_FULL_PLAYER](state, payload) {
    state.isPlayerFull = payload;
  },
  [SET_PLAY_TIME](state, payload) {
    state.expectTime = payload;
  },
  [SET_DURATION](state, payload) {
    state.duration = payload;
  },
  [SET_CURRENT_TIME](state, payload) {
    state.currentTime = payload;
  }
};
