import { ActionTree } from "vuex";

import { State } from "./state";
import { Actions, ActionTypes, MutationType } from "./types";

import { getSongUrl, getSongsLyric } from "@/network/song";
import { Song } from "@/network/song/model";

export const actions: ActionTree<State, State> & Actions = {
  /* 播放器相关 */
  [ActionTypes.SetPlaying]({ commit }, payload: boolean) {
    commit(MutationType.SET_PLAYING, payload);
  },

  async [ActionTypes.GetCurrentLyric]({ commit }, currentID: number) {
    // 单个歌曲对应歌词
    const lyrics = await getSongsLyric(currentID);
    commit(MutationType.SET_CURRENT_LYRIC, lyrics);
  },

  /* 播放列表相关 */
  async [ActionTypes.AddSongsToPlayList](
    { getters, commit },
    songsInfo: Array<SongInfo>
  ) {
    // 过滤playlist已有歌曲
    const songsInfoFilter = songsInfo.filter(
      (songinfo: SongInfo) => !getters.getSongById(songinfo.id)
    );
    const ids = songsInfoFilter.map(songsInfo => songsInfo.id);

    // 加入队列的歌曲
    const songs: ISong[] = [];
    // 全部都在playlist已有
    if (ids.length !== 0) {
      // 批量获取url
      const urls = await getSongUrl(ids);
      songsInfoFilter.forEach((songInfo, index, arr) => {
        if (urls[index]) {
          songs.push(new Song(songInfo, urls[index]));
        } else {
          console.log("不能获取歌曲播放信息：", songInfo.id);
        }
      });
      commit(MutationType.ADD_TO_PLAYLIST, songs);
    }

    commit(MutationType.SET_CURRENT_SONG, songs[0]);
  },

  [ActionTypes.SwitchByOrder]({ state, getters, commit }, payload: string) {
    let length = getters.LIST_LENGTH;
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
    let length = getters.LIST_LENGTH;
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
