declare type IBanner = {
  typeTitle: string;
  titleColor: string;
  pic: string;
};

declare type SongInfo = {
  id: number;
  name: string;
  ar: Array<{
    id: number;
    name: string;
  }>;
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  alia: Array<string>;
  mv: number;
};

declare interface Songlist {
  id: number;
  // 封面
  coverImgUrl: string;
  picUrl: string;

  name: string;
  creator: { avatarUrl: string; nickname: string };
  description: string;
  subscribedCount: number;
  trackCount: number;
  playCount: number;
  shareCount: number;
  commentCount: number;

  trackIds: { id: number }[];
}

declare interface Artist {
  id: number;
  score: number;
  lastRank: number;
  // 网易云账号id
  accountId: number;
  // 头像图片
  img1v1Url: string;
  picUrl: string;
  name: string;
  alias: Array<string>;
}

declare type Album = {
  picUrl: string;
  name: string;
  alias: Array<string>;
  artist: Array<{
    id: number;
    name: string;
  }>;
  publishTime: number;
};

declare type User = {
  userId: number;
  followed: boolean;
  avatarUrl: string;
  nickname: string;
  signature: string;
};

declare type Complex = {
  song: {
    moreText: string;
    songs: Array<SongInfo>;
  };
  playList: {
    moreText: string;
    playLists: Array<Songlist>;
  };
  artist: {
    moreText: string;
    artists: Array<Artist>;
  };
  album: {
    moreText: string;
    albums: Array<Album>;
  };
  user: {
    moreText: string;
    users: Array<User>;
  };
  sim_query: {
    sim_querys: Array<{
      keyword: string;
    }>;
  };
};
