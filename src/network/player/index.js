import { getNeteaseRequest } from "../request";
import { collectSongUrl, collectSongInfo, collectSongLyric } from "./model";

const URL_songs = {
  urls: "/song/url",
  info: "/song/detail",
  lyric: "/lyric"
};

export const getSongUrl = async ids => {
  /* 批量获取:用数组接收多个id,最终以逗号连接 */
  const id = Array.isArray(ids) ? ids.join(",") : ids;
  const res = await getNeteaseRequest({
    url: URL_songs.urls,
    params: {
      id
    }
  });
  return collectSongUrl(res);
};
export const getSongsInfo = async idArr => {
  let ids = Array.isArray(idArr) ? idArr.join(",") : idArr;
  const res = await getNeteaseRequest({
    url: URL_songs.info,
    params: {
      ids
    }
  });
  return collectSongInfo(res);
};
export const getSongsLyric = async id => {
  const res = await getNeteaseRequest({
    url: URL_songs.lyric,
    params: {
      id
    }
  });
  return collectSongLyric(res);
};
