import { SongsTransfrom, SonglistsTransfrom } from "../common";
import { getNeteaseRequest } from "../request";
const URL_detail = {
  songlist: "/playlist/detail",
  songs: "/song/detail"
};

export const getSonglistDetail = async (id: number) => {
  const { data } = await getNeteaseRequest({
    url: URL_detail.songlist,
    params: {
      id
    },
    transformResponse: data => {
      const playlist = JSON.parse(data).playlist;
      // 传入数组，传出后取第一个值
      return SonglistsTransfrom([playlist]);
    }
  });
  return data[0];
};

export const getSongsDetail = async (idArr: number[]) => {
  let ids = idArr.join(",");
  const { data } = await getNeteaseRequest({
    url: URL_detail.songs,
    params: {
      ids
    },
    transformResponse: data => {
      const songs = JSON.parse(data).songs;
      return SongsTransfrom(songs);
    }
  });
  return data;
};
