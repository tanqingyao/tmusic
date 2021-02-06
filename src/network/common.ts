import { changeUnit, showSinger } from "@/common/utils/show";

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
      // 歌单详情显示
      creatorUrl: p.creator.avatarUrl,
      creatorname: p.creator.nickname,
      cover: p.coverImgUrl,
      name: p.name,
      description: p.description,
      subscribedCount: p.subscribedCount,
      trackCount: p.trackCount,
      playCount: p.playCount,
      shareCount: p.shareCount,
      commentCount: p.commentCount,
      // 用于搜索歌曲
      songIds: p.trackIds.map(item => item.id),
      // 用于搜索显示
      desc: `${p.trackCount}首，by ${
        p.creator ? p.creator.nickname : ""
      }，播放${changeUnit(p.playCount)}次`
    };
  });
  return songlists;
};
