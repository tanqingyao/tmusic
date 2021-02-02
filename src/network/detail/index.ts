import { getNeteaseRequest } from "../request";
import { collectSonglistDetail, collectSongDetail } from "./model";
const URL_detail = {
  songlist: "/playlist/detail",
  songs: "/song/detail"
};

export const getSonglistDetail = async (id: number) => {
  const res = await getNeteaseRequest({
    url: URL_detail.songlist,
    params: {
      id
    }
  });
  return collectSonglistDetail(res);
};

export const getSongsDetail = async (idArr: number[]) => {
  let ids = Array.isArray(idArr) ? idArr.join(",") : idArr;
  const res = await getNeteaseRequest({
    url: URL_detail.songs,
    params: {
      ids
    }
  });
  return collectSongDetail(res);
};
