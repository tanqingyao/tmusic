import { AxiosResponse } from "axios";
import { SearchType } from "@/common/constant";
import {
  SongsTransfrom,
  SonglistsTransfrom,
  ArtistsTransfrom,
  AlbumsTransfrom,
  UsersTransfrom
} from "../common";

export const collectSearchDefault = (res: AxiosResponse) => {
  const { realkeyword: real, showKeyword: show } = res.data.data;
  return {
    real,
    show
  };
};
export const collectSearchSuggest = (res: AxiosResponse) => {
  let suggests: { key: string }[] = [];
  if (res.data.result.allMatch) {
    suggests = res.data.result.allMatch.map((suggest: any) => {
      return {
        key: suggest.keyword
      };
    });
  }
  return suggests;
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

export const SearchCloudTransfrom = (result: any, type: number) => {
  let dataTransfrom;
  switch (type) {
    case SearchType.SONGS:
      dataTransfrom = SongsTransfrom(result.songs);
      break;

    case SearchType.PLAYLISTS:
      dataTransfrom = SonglistsTransfrom(result.playlists);
      break;

    case SearchType.ARTISTS:
      dataTransfrom = ArtistsTransfrom(result.artists);
      break;

    case SearchType.ALBUMS:
      dataTransfrom = AlbumsTransfrom(result.albums);
      break;

    case SearchType.USERS:
      dataTransfrom = UsersTransfrom(result.userprofiles);
      break;

    default:
      break;
  }
  return dataTransfrom;
};

export const ComplexTransfrom = (res: any) => {
  // 转化信息
  let moreTextArr: Array<string> = [];
  moreTextArr.push(
    res.song.moreText,
    res.playList.moreText,
    res.artist.moreText,
    res.album.moreText,
    res.user.moreText
  );

  const songs = SongsTransfrom(res.song.songs);

  const playLists = SonglistsTransfrom(res.playList.playLists);

  const artists = ArtistsTransfrom(res.artist.artists);

  const albums = AlbumsTransfrom(res.album.albums);

  const users = UsersTransfrom(res.user.users);

  const simiQuery = res.sim_query.sim_querys;

  return {
    simiQuery,
    moreTextArr,
    items: {
      [SearchType.SONGS]: songs,
      [SearchType.PLAYLISTS]: playLists,
      [SearchType.ARTISTS]: artists,
      [SearchType.ALBUMS]: albums,
      [SearchType.USERS]: users
    }
  };
};
