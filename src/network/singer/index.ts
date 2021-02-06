import { SingerTransfrom } from "./model";
import { getNeteaseRequest } from "../request";

const URL_singer = {
  detail: "/artist/detail",
  topSong: "/artist/top/song?id=5781"
};

export const getSingerDetail = async (id: number) => {
  const { data } = await getNeteaseRequest({
    url: URL_singer.detail,
    params: {
      id
    },
    transformResponse: data => {
      const singerInfo = JSON.parse(data);
      return SingerTransfrom(singerInfo);
    }
  });
  return data;
};
