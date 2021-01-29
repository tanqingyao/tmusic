//store/index.ts
import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger
} from "vuex";
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";

export const store = createStore<State>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state,
  mutations,
  actions,
  getters
});
export function useStore() {
  return store as Store;
}
export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
/* vuex官方demo */
// import { InjectionKey } from "vue";
// import { createStore, useStore as baseUseStore, Store } from "vuex";
// import mutations from "./mutations";
// import getters from "./getters.js";
// import actions from "./actions";
// export const key: InjectionKey<Store<State>> = Symbol();
// export const store = createStore<State>(
//   state,
//   getters,
//   actions,
//   mutations
// });

// define your own `useStore` composition function
// export function useStore() {
//   return baseUseStore(key);
// }
/* 没有用ts之前 */
// const store = createStore({
//   state() {
//     return {
//       /* 歌曲信息相关 */
//       searchDefault: { real: "", show: "" },
//       playList: [],
//       /* 播放器相关 */
//       isPlayerFull: false,
//       autoPlay: true,
//       currentSong: {},
//       isPlaying: false,
//       expectTime: 0,
//       duration: -1,
//       currentTime: 0
//     };
//   },
//   getters,
//   actions,
//   mutations
// });
// export default store;
