import { getNeteaseRequest } from "../request";
import { Lyric_Transfrom } from "./model";

const URL_songs = {
  urls: "/song/url",
  info: "/song/detail",
  lyric: "/lyric"
};
export const getSongUrl = async (ids: number[]) => {
  /* 批量获取:用数组接收多个id,最终以逗号连接 */
  const id = ids.join(",");
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
      console.log(JSON.parse(data).songs);

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
    transformResponse: rdata => {
      const data = JSON.parse(rdata);

      let lrc: string = "";
      let trans: string = "";
      /* 提取原歌词和翻译歌词 */
      if (data.lrc) {
        lrc = data.lrc.lyric;
      }
      if (data.tlyric) {
        trans = data.tlyric.lyric;
      }
      const transform = Lyric_Transfrom(lrc, trans);
      return transform;
    }
  });
  return lyrics;
};
