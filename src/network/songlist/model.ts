export const RecommedTransfrom = (res: Array<Songlist>) => {
  const songlists = res.map((s: Songlist) => {
    return {
      id: s.id,
      cover: s.picUrl,
      title: s.name,
      playCount: s.playCount
    };
  });
  return songlists;
};
