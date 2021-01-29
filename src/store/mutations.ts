// import {
//   ADD_TO_PLAYLIST,
//   SET_AUTOPLAY,
//   SET_CURRENT_SONG,
//   SET_FULL_PLAYER,
//   SET_PLAYING,
//   SET_PLAY_TIME,
//   SET_DURATION,
//   SET_CURRENT_TIME
// } from "./mutations-types"
import { MutationTree } from "vuex";
import { State } from "./state";
export enum MutationType {
  ADD_TO_PLAYLIST = "addToPlayList",
  SET_CURRENT_SONG = "setCurrentSong",
  SET_PLAYING = "setPlaying",
  SET_AUTOPLAY = "setAutoPlay",
  SET_FULL_PLAYER = "setFullPlayer",
  SET_PLAY_TIME = "setPlayTime",
  SET_DURATION = "duration",
  SET_CURRENT_TIME = "setCurrentTime"
}
export type Mutations = {
  [MutationType.ADD_TO_PLAYLIST](state: State, songs: ISong[]): void;
  [MutationType.SET_CURRENT_SONG](state: State, value: ISong): void;
  [MutationType.SET_PLAYING](state: State, value: boolean): void;
  [MutationType.SET_AUTOPLAY](state: State, value: boolean): void;
  [MutationType.SET_FULL_PLAYER](state: State, value: boolean): void;
  [MutationType.SET_PLAY_TIME](state: State, value: number): void;
  [MutationType.SET_DURATION](state: State, value: number): void;
  [MutationType.SET_CURRENT_TIME](state: State, value: number): void;
  /* example */
  // [MutationType.CompleteTask](
  //   state: State,
  //   task: Partial<TaskItem> & { id: number }
  // ): void
  // [MutationType.SetCreateModal](state: State, value: boolean): void
  // [MutationType.SetEditModal](state: State, value: {showModal: boolean, taskId: number|undefined}): void
};
export const mutations: MutationTree<State> & Mutations = {
  [MutationType.ADD_TO_PLAYLIST](state: State, payload: ISong[]) {
    if (state.playList) {
      state.playList.push(...payload);
    }
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
