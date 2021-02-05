import { MutationTree } from "vuex";
import { State } from "./state";
import { Mutations, MutationType } from "./types";

export const mutations: MutationTree<State> & Mutations = {
  /* 播放列表相关 */
  [MutationType.ADD_TO_PLAYLIST](state: State, payload: ISong[]) {
    state.playList.push(...payload);
  },
  /* 播放器相关 */
  [MutationType.SET_CURRENT_LYRIC](state: State, payload: ILyric) {
    (state.currentSong as ISong).lyrics = payload;
  },
  [MutationType.SET_CURRENT_SONG](state: State, payload: ISong) {
    state.currentSong = payload;
  },
  [MutationType.SET_PLAYING](state: State, payload: boolean) {
    state.isPlaying = payload;
  },
  [MutationType.SET_AUTOPLAY](state: State, payload: boolean) {
    state.autoPlay = payload;
  },
  [MutationType.SET_FULL_PLAYER](state: State, payload: boolean) {
    state.isPlayerFull = payload;
  },
  [MutationType.SET_PLAY_TIME](state: State, payload: number) {
    state.expectTime = payload;
  },
  [MutationType.SET_DURATION](state: State, payload: number) {
    state.duration = payload;
  },
  [MutationType.SET_CURRENT_TIME](state: State, payload: number) {
    state.currentTime = payload;
  }
};
