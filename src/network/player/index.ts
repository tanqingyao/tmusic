import { getNeteaseRequest } from "../request";
// import { transfromSongUrl, collectSongInfo, collectSongLyric } from "./model";

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
  console.log(urls);
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
  console.log(songsInfo);
  return songsInfo;
};
export const getSongsLyric = async (id: number) => {
  const { data: lyric } = await getNeteaseRequest({
    url: URL_songs.lyric,
    params: {
      id
    },
    transformResponse: data => {
      return JSON.parse(data);
    }
  });
  console.log(lyric);

  return lyric;
};
