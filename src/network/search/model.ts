import { AxiosResponse } from "axios";
import { showSinger, parseDate, changeUnit } from "@/common/utils/show";
import { SearchType } from "@/common/constant";

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

export const ComplexTransfrom = (res: Complex) => {
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

export const SongsTransfrom = (res: Array<SongInfo>) => {
  const songs = res.map((s: SongInfo) => {
    return {
      name: s.name,
      desc: `${showSinger(s.ar)} - ${s.al.name}`,
      alia: s.alia ? s.alia[0] : "",
      mv: s.mv
    };
  });
  return songs;
};

export const SonglistsTransfrom = (res: Array<Songlist>) => {
  const songlists = res.map((p: Songlist) => {
    return {
      imgUrl: p.coverImgUrl,
      name: p.name,
      desc: `${p.trackCount}首，by ${
        p.creator ? p.creator.nickname : ""
      }，播放${changeUnit(p.playCount)}次`
    };
  });
  return songlists;
};

export const ArtistsTransfrom = (res: Array<Artist>) => {
  const artists = res.map((a: Artist) => {
    return {
      id: a.accountId,
      imgUrl: a.picUrl,
      // 判断是否显示别名
      name: `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`,
      desc: ``
    };
  });
  return artists;
};

export const AlbumsTransfrom = (res: Array<Album>) => {
  const albums = res.map((a: Album) => {
    return {
      imgUrl: a.picUrl,
      name: `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`,
      desc: `${showSinger(a.artist)} ${parseDate(a.publishTime)}`
    };
  });
  return albums;
};

export const UsersTransfrom = (res: Array<User>) => {
  const users = res.map((u: User) => {
    return {
      id: u.userId,
      followed: u.followed,
      imgUrl: u.avatarUrl,
      name: u.nickname,
      desc: `${u.signature}`
    };
  });
  return users;
};
