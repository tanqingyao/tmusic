import {
  ADD_TO_PLAYLIST,
  SET_CURRENT_SONG,
  SET_PLAYING
} from "./mutations-types";

import { getSongUrl, getSongsInfo, getSongsLyric } from "network/player";
import { Song } from "network/player/model";
import { _getAlbumById } from "network/album";
export default {
  setPlaying: ({ commit }, payload) => commit(SET_PLAYING, payload),
  async addPlayList({ state, getters, dispatch, commit }, payload) {
    // TODO ts rebuild
    // payload为歌曲id数组

    // 过滤playlist已有歌曲
    const ids = payload.filter(id => !getters.getSongById(id));

    const songs = await dispatch("_fetchSongData", ids);
    commit(ADD_TO_PLAYLIST, ...songs);
    commit(SET_CURRENT_SONG, songs[0]);
    // TODO 若没有选择自动播放,直接添加至播放列表.否则改变当前歌曲
  },
  async addToPlayList({ state, getters, dispatch, commit }, payload) {
    // 获取单个id信息:payload为专辑内歌曲信息
    let id = payload.songmid;
    let song = getters.getSongById(id);
    // 若当前播放列表已经有,则不获取歌曲信息,直接设置当前歌曲
    if (!song) {
      song = await dispatch("_fetchSongData", id);
      commit(ADD_TO_PLAYLIST, song);
    }
    // TODO 若没有选择自动播放,直接添加至播放列表.否则改变当前歌曲
    // commit(SET_CURRENT_SONG, song);
    return new Promise((resolve, reject) => {
      resolve(song);
    });
  },

  switchByOrder({ state, getters, commit }, payload) {
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
      commit(SET_CURRENT_SONG, state.playList[last]);
    } else if (payload === "next") {
      let next = (index + 1) % length;
      commit(SET_CURRENT_SONG, state.playList[next]);
    }
  },
  switchByShuffle({ state, getters, commit }) {
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
    commit(SET_CURRENT_SONG, state.playList[index]);
  },

  async _fetchSongData(context, ids) {
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
    return new Promise(resolve => {
      resolve(songs);
    });
  }
};
