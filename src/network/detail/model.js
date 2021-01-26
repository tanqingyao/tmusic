export const collectSonglistDetail = res => {
  const {
    creator: { avatarUrl: avatar, nickname: name },
    name: title,
    coverImgUrl: cover,
    description: desc,
    subscribedCount,
    trackCount,
    playCount,
    shareCount,
    commentCount
  } = res.data.playlist;
  const songIds = res.data.playlist.trackIds.map(item => item.id);
  return {
    avatar,
    name,
    title,
    cover,
    desc,
    subscribedCount,
    trackCount,
    playCount,
    shareCount,
    commentCount,
    songIds
  };
};

export const collectSongDetail = res => {
  return res.data.songs.map(item => {
    const artists = item.ar.map(item => item.name);
    return {
      id: item.id,
      name: item.name,
      alia: item.alia[0],
      album: item.al.name,
      artists
    };
  });
};
