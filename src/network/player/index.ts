import { getNeteaseRequest } from "../request";
import { Lyric_Transfrom } from "./model";

const URL_songs = {
  urls: "/song/url",
  info: "/song/detail",
  lyric: "/lyric"
};
export const getSongUrl = async (ids: number[]) => {
  /* 批量获取:用数组接收多个id,最终以逗号连接 */
  const id = Array.isArray(ids) ? ids.join(",") : ids;
  const { data: urls } = await getNeteaseRequest({
    url: URL_songs.urls,
    params: {
      id
    },
    // Response中data此时为string
    transformResponse: data => {
      return JSON.parse(data).data;
    }
  });

  return urls;
};
export const getSongsInfo = async (idArr: number[]) => {
  let ids = Array.isArray(idArr) ? idArr.join(",") : idArr;
  const { data: songsInfo } = await getNeteaseRequest({
    url: URL_songs.info,
    params: {
      ids
    },

    transformResponse: data => {
      return JSON.parse(data).songs;
    }
  });

  return songsInfo;
};
export const getSongsLyric = async (id: number) => {
  const { data: lyrics } = await getNeteaseRequest({
    url: URL_songs.lyric,
    params: {
      id
    },
    transformResponse: data => {
      /* 提取原歌词和翻译歌词 */
      const {
        lrc: { lyric: lrc },
        tlyric: { lyric: trans }
      } = JSON.parse(data);
      const transform = Lyric_Transfrom(lrc, trans);
      console.log(transform);
      return transform;
    }
  });
  return lyrics;
};
