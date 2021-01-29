import { ActionTree } from "vuex";

import { State } from "./state";
import { Actions, ActionTypes, MutationType } from "./types";

import { getSongUrl, getSongsInfo, getSongsLyric } from "@/network/player";
import { Song } from "@/network/player/model";

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SetPlaying]({ commit }, payload: boolean) {
    commit(MutationType.SET_PLAYING, payload);
  },

  async [ActionTypes.AddPlayList]({ getters, commit }, songsID: number[]) {
    // 过滤playlist已有歌曲
    const ids = songsID.filter((id: number) => !getters.getSongById(id));

    const songs = await _fetchSongData(ids);
    commit(MutationType.ADD_TO_PLAYLIST, songs);
    commit(MutationType.SET_CURRENT_SONG, songs[0]);
    // TODO 若没有选择自动播放,直接添加至播放列表.否则改变当前歌曲
  },

  [ActionTypes.SwitchByOrder]({ state, getters, commit }, payload: string) {
    let length = getters.listLength;
    if (!length || length === 1) {
      // TODO: toast提醒
      console.log("请多添加点歌曲哟~");
      return;
    }
    let index = getters.currentSongIndex;
    // 考虑边界情况
    if (payload === "last") {
      let last = (index - 1 + length) % length;
      commit(MutationType.SET_CURRENT_SONG, (state.playList as ISong[])[last]);
    } else if (payload === "next") {
      let next = (index + 1) % length;
      commit(MutationType.SET_CURRENT_SONG, (state.playList as ISong[])[next]);
    }
  },

  [ActionTypes.SwitchByShuffle]({ state, getters, commit }) {
    let length = getters.listLength;
    if (!length || length === 1) {
      console.log("请多添加点歌曲哟~");
      return;
    }
    let origin = getters.currentSongIndex;
    let index = origin;
    //排除切换自身
    while (index === origin) {
      index = Math.floor(Math.random() * length);
    }
    commit(MutationType.SET_CURRENT_SONG, (state.playList as ISong[])[index]);
  }
};

const _fetchSongData = async (ids: number[]) => {
  let songs = [];
  try {
    // 歌曲播放url
    const urls = await getSongUrl(ids);
    // 歌曲信息
    const infos = await getSongsInfo(ids);
    for (const i in ids) {
      // 单个歌曲对应歌词
      const lyric = await getSongsLyric(ids[i]);
      songs.push(new Song(infos[i], urls[i], lyric));
    }
  } catch (error) {
    console.error(error);
  }
  return songs;
};
