export const RecommedTransfrom = (res: Array<SonglistCover>) => {
  const songlists = res.map((s: SonglistCover) => {
    return {
      id: s.id,
      cover: s.picUrl,
      title: s.name,
      playCount: s.playCount
    };
  });
  return songlists;
};
