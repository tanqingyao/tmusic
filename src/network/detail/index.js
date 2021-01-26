import { getNeteaseRequest } from "../request";
import { collectSonglistDetail, collectSongDetail } from "./model";
const URL_detail = {
  songlist: "/playlist/detail",
  songs: "/song/detail"
};

export const getSonglistDetail = async id => {
  const res = await getNeteaseRequest({
    url: URL_detail.songlist,
    params: {
      id
    }
  });
  return collectSonglistDetail(res);
};

export const getSongs = async idArr => {
  let ids = Array.isArray(idArr) ? idArr.join(",") : idArr;
  const res = await getNeteaseRequest({
    url: URL_detail.songs,
    params: {
      ids
    }
  });
  return collectSongDetail(res);
};
