import { AxiosResponse } from "axios";

export const collectSonglistDetail = (res: AxiosResponse) => {
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
  const songIds = res.data.playlist.trackIds.map(
    (item: { id: number }) => item.id
  );
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

// TODO 改到 axios中的transformResponse
export const collectSongDetail = (res: AxiosResponse) => {
  return res.data.songs.map((item: any) => {
    const artists = item.ar.map((item: any) => item.name);
    return {
      id: item.id,
      name: item.name,
      alia: item.alia[0],
      album: item.al.name,
      artists
    };
  });
};
