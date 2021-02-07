import { showSinger, parseFullDate, changeUnit } from "@/common/utils/show";

export const SongsTransfrom = (res: Array<SongInfo>) => {
  const songs = res.map((s: SongInfo) => {
    return {
      id: s.id,
      name: s.name,
      ar: s.ar,
      al: s.al,
      alia: s.alia ? s.alia[0] : "",
      mv: s.mv,
      desc: `${showSinger(s.ar)} - ${s.al.name}`
    };
  });
  return songs;
};

export const SonglistsTransfrom = (res: Array<Songlist>) => {
  const songlists = res.map((p: Songlist) => {
    return {
      id: p.id,
      name: p.name,
      // 歌单详情显示
      creator: p.creator,
      cover: p.coverImgUrl,
      imgUrl: p.coverImgUrl,
      description: p.description,
      subscribedCount: p.subscribedCount,
      trackCount: p.trackCount,
      playCount: p.playCount,
      shareCount: p.shareCount,
      commentCount: p.commentCount,
      // 用于搜索歌曲
      songIds: p.trackIds ? p.trackIds.map(item => item.id) : [],
      // 用于搜索显示
      desc: `${p.trackCount}首，by ${
        p.creator ? p.creator.nickname : ""
      }，播放${changeUnit(p.playCount)}次`
    };
  });
  return songlists;
};

export const ArtistsTransfrom = (res: Array<any>) => {
  const artists: Array<IArtist> = res.map((a: any) => {
    return {
      id: a.id,
      imgUrl: a.picUrl,
      name: a.name,
      alias: a.alias,
      account: {
        id: a.accountId
      }
    };
  });
  return artists;
};

export const AlbumsTransfrom = (res: Array<Album>) => {
  const albums = res.map((a: Album) => {
    return {
      imgUrl: a.picUrl,
      name: `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`,
      desc: `${showSinger(a.artist)} ${parseFullDate(a.publishTime)}`
    };
  });
  return albums;
};

export const UsersTransfrom = (res: Array<any>) => {
  const users: Array<IUser> = res.map((u: any) => {
    return {
      id: u.userId,
      nickname: u.nickname,
      followed: u.followed,
      avatarUrl: u.avatarUrl,
      desc: `${u.signature}`
    };
  });
  return users;
};
