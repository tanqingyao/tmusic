import { GetterTree } from "vuex";
import { State } from "./state";
import { Getters } from "./types";

export const getters: GetterTree<State, State> & Getters = {
  listLength: (state: State) => {
    return state.playList ? state.playList.length : 0;
  },
  currentSongIndex: (state: State) => {
    if (state.playList) {
      return state.playList.findIndex(
        item => item.id === (state.currentSong as ISong).id
      );
    } else {
      return -1;
    }
  },
  // 返回函数进行传参,不会缓存
  getSongById: (state: State) => (id: number) => {
    if (state.playList) {
      return state.playList.find(item => item.id === id);
    }
  }
};