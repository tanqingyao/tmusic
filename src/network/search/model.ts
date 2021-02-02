import { AxiosResponse } from "axios";

export const collectSearchDefault = (res: AxiosResponse) => {
  const { realkeyword: real, showKeyword: show } = res.data.data;
  return {
    real,
    show
  };
};
export const collectSearchSuggest = (res: AxiosResponse) => {
  const suggests = res.data.result.allMatch.map((suggest: any) => {
    return {
      key: suggest.keyword
    };
  });
  return suggests;
};

export const collectSearchHot = (res: AxiosResponse) => {
  const hots = res.data.data.map((suggest: any) => {
    return {
      score: suggest.score,
      key: suggest.searchWord,
      iconL: suggest.iconUrl
    };
  });
  return hots;
};

export const collectSearchCloud = (res: AxiosResponse) => {
  const songs = res.data.result.songs.map((song: any) => {
    return {
      name: song.name,
      album: song.al.name,
      mv: song.mv
    };
  });
  return songs;
};
export const Complex_Transfrom = (res: any) => {
  return {
    order: res.order,
    song: res.song,
    playList: res.playList,
    artist: res.artist,
    album: res.album,
    user: res.user
  };
};
