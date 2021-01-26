export const collectBanner = res => {
  return res.data.banners.map(item => {
    return {
      title: item.typeTitle,
      titleColor: item.titleColor,
      img: item.pic
    };
  });
};

export const collectRecommendSonglist = res => {
  return res.data.recommend.map(item => {
    return {
      id: item.id,
      title: item.name,
      cover: item.picUrl,
      playCount: item.playcount
    };
  });
};
