import { AxiosResponse } from "axios";
import { showSinger, parseDate, changeUnit } from "@/common/utils/show";

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
  console.log(res);

  // 所需要的数据
  let displayItem = ["song", "playList", "artist", "album", "user"];

  // 转化信息
  const songs = (res.song.songs as any[]).map(s => {
    return {
      imgUrl: "",
      name: s.name,
      desc: `${showSinger(s.ar)} - ${s.al.name}`
    };
  });

  const playLists = (res.playList.playLists as any[]).map(p => {
    return {
      imgUrl: p.coverImgUrl,
      name: p.name,
      desc: `${p.trackCount}首，by ${
        p.creator ? p.creator.nickname : ""
      }，播放${changeUnit(p.playCount)}次`
    };
  });

  const artists = (res.artist.artists as any[]).map(a => {
    return {
      imgUrl: a.picUrl,
      // 判断是否显示别名
      name: `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`,
      desc: `${showSinger(a.ar)} - ${a.al ? a.al.name : ""}`
    };
  });

  const albums = (res.album.albums as any[]).map(a => {
    return {
      imgUrl: a.picUrl,
      name: `${a.name}${a.alias[0] ? "（" + a.alias[0] + "）" : ""}`,
      desc: `${a.signature}`
    };
  });

  const users = (res.user.users as any[]).map(u => {
    return {
      imgUrl: u.avatarUrl,
      name: u.nickname,
      desc: `${u.signature}`
    };
  });

  const moreTextArr = displayItem.map((key: string) => {
    return res[key].moreText;
  });

  const simiQuery = res.sim_query.sim_querys;

  return {
    simiQuery,
    moreTextArr,
    items: {
      songs,
      playLists,
      artists,
      albums,
      users
    }
  };
};
