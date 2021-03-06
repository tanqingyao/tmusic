import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { State } from "./state";
import { ActionContext } from "vuex";

/* Getters */
export type Getters = {
  currentSongIndex(state: State): number;
  LIST_LENGTH(state: State): number;
  getSongById(state: State): (id: number) => ISong | undefined;
};

/* Mutations */
export enum MutationType {
  ADD_TO_PLAYLIST = "addToPlayList",
  DELETE_SONG = "deleteSong",
  SET_CURRENT_LYRIC = "setCurrentSongLyric",
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
  [MutationType.SET_CURRENT_LYRIC](state: State, value: ILyric): void;
  [MutationType.SET_CURRENT_SONG](state: State, value: ISong): void;
  [MutationType.SET_PLAYING](state: State, value: boolean): void;
  [MutationType.SET_AUTOPLAY](state: State, value: boolean): void;
  [MutationType.SET_FULL_PLAYER](state: State, value: boolean): void;
  [MutationType.SET_PLAY_TIME](state: State, value: number): void;
  [MutationType.SET_DURATION](state: State, value: number): void;
  [MutationType.SET_CURRENT_TIME](state: State, value: number): void;
};

/* Actions */
type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};
export enum ActionTypes {
  /* 播放器相关 */
  SetPlaying = "SET_Player_Play",
  GetCurrentLyric = "GET_Current_Song_Lyric",
  /* 播放列表相关 */
  AddSongsToPlayList = "Add_Song_TO_PlayList",
  SwitchByOrder = "Order_Switch_Song",
  SwitchByShuffle = "Shuffle_Switch_Song"
}
export type Actions = {
  [ActionTypes.SetPlaying](context: ActionAugments, value: boolean): void;
  [ActionTypes.GetCurrentLyric](context: ActionAugments, id: number): void;
  [ActionTypes.AddSongsToPlayList](
    context: ActionAugments,
    songsInfo: Array<SongInfo>
  ): void;
  [ActionTypes.SwitchByOrder](context: ActionAugments, mode: string): void;
  [ActionTypes.SwitchByShuffle](context: ActionAugments, mode: string): void;
};

/* Store */
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
