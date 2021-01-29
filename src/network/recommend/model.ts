import { AxiosResponse } from "axios";

export const collectBanner = (res: AxiosResponse) => {
  return res.data.banners.map((item: IBanner) => {
    return {
      title: item.typeTitle,
      titleColor: item.titleColor,
      img: item.pic
    };
  });
};

export const collectRecommendSonglist = (res: AxiosResponse) => {
  return res.data.recommend.map((item: any) => {
    return {
      id: item.id,
      title: item.name,
      cover: item.picUrl,
      playCount: item.playcount
    };
  });
};
