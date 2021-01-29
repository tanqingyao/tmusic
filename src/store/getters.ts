import { GetterTree } from "vuex";
import { State } from "./state";
export type Getters = {
  listLength(state: State): number;
  currentSongIndex(state: State): number;
  getSongById(state: State): (id: number) => ISong | undefined;
};

export const getters: GetterTree<State, State> & Getters = {
  // completedTaskCount(state) {
  //   return state.tasks.filter(element => element.completed).length
  // },
  // totalTaskCount(state) {
  //   return state.tasks.length
  // },
  // getTaskById: (state) => (id: number) => {
  //   return state.tasks.find(task => task.id === id)
  // }

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
// export default {
//   listLength: (state: State) => {
//     if (state.playList) {
//       return state.playList.length;
//     }
//   },
//   currentSongIndex: (state: State) => {
//     if (state.playList && state.currentSong) {
//       return state.playList.findIndex(item => item.id === state.currentSong.id);
//     }
//   },
//   // 返回函数进行传参,不会缓存
//   getSongById: (state: State) => (id: number) => {
//     if (state.playList) {
//       return state.playList.find(item => item.id === id);
//     }
//   }
// };
