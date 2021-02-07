export const RankSingersTransfrom = (res: {
  artists: Array<Artist>;
  updateTime: number;
}) => {
  const singers = res.artists.map((s: any) => {
    return {
      score: s.score,
      lastRank: s.lastRank,
      picUrl: s.img1v1Url,
      id: s.id,
      name: s.name,
      alia: s.alias ? s.alias[0] : ""
    };
  });
  return { singers, updateTime: res.updateTime };
};
