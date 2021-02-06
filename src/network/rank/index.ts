import { RankSingersTransfrom } from "./model";
import { getNeteaseRequest } from "../request";
const URL_rank = {
  detail: "/toplist/detail",
  artist: "/toplist/artist"
};

export const getRankDetail = async () => {
  const { data } = await getNeteaseRequest({
    url: URL_rank.detail,
    transformResponse: data => {
      const playlist = JSON.parse(data).playlist;
      // 传入数组，传出后取第一个值
      //   return SonglistsTransfrom([playlist]);
    }
  });
  return data[0];
};

export const getRankSingers = async (type: number) => {
  const { data } = await getNeteaseRequest({
    url: URL_rank.artist,
    params: {
      type
      // type : 地区
      // 1: 华语
      // 2: 欧美
      // 3: 韩国
      // 4: 日本
    },
    transformResponse: data => {
      const list = JSON.parse(data).list;
      return RankSingersTransfrom(list);
    }
  });
  return data;
};
