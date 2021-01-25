import { getNeteaseRequest } from "../request";

const URL_recommend = {
  songList: "/recommend/resource",
  banner: "/banner"
};

export const getBanner = async () => {
  const res = await getNeteaseRequest({
    url: URL_recommend.banner,
    // 0: pc(default) ,1: android, 2: iphone, 3: ipad
    type: 1
  });
  return collectBanner(res);
};
const collectBanner = res => {
  return res.data.banners.map(item => {
    return {
      title: item.typeTitle,
      titleColor: item.titleColor,
      img: item.imageUrl
    };
  });
};

export const getRecommendSongList = async () => {
  const res = await getNeteaseRequest({
    url: URL_recommend.songList
  });
  return collectSongList(res);
};
const collectSongList = res => {
  return res.data.recommend.map(item => {
    return {
      id: item.id,
      title: item.name,
      cover: item.picUrl,
      playCount: item.playcount
    };
  });
};
