import { getNeteaseRequest } from "../request";
import { collectBanner, collectRecommendSonglist } from "./model";
const URL_recommend = {
  songlist: "/recommend/resource",
  banner: "/banner"
};

export const getBanner = async () => {
  const res = await getNeteaseRequest({
    url: URL_recommend.banner,
    params: {
      // 0: pc(default) ,1: android, 2: iphone, 3: ipad
      type: 1
    }
  });
  return collectBanner(res);
};

export const getRecommendSonglist = async () => {
  const res = await getNeteaseRequest({
    url: URL_recommend.songlist
  });
  return collectRecommendSonglist(res);
};
